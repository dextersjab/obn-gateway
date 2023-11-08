import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company, Profile, User } from 'src/common/database/entities';
import { Repository, MoreThan } from 'typeorm';
import { LoginDto, ResetPasswordDto, SignupDto } from './dto/index.dto';
import { IBadRequestException } from 'src/common/utils/exceptions/exceptions';
import { userErrors } from 'src/common/constants/errors/user.errors';
import {
  ApiResponse,
  ResponseFormatter,
} from 'src/common/utils/common/response.util';
import { compareSync, hashSync } from 'bcrypt';
import { authErrors } from 'src/common/constants/errors/auth.errors';
import { Auth } from 'src/common/utils/authentication/auth.helper';
import * as moment from 'moment';
import { createHash } from 'crypto';
import { Role } from 'src/common/database/entities/role.entity';
import { ROLES } from 'src/roles/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly auth: Auth,
  ) {}

  async signup(data: SignupDto) {
    // Check if user with this email already exists
    const userExists = await this.userRepository.count({
      where: {
        email: data.email.trim().toLowerCase(),
      },
    });

    // TODO Add condition for when user is already added to another team?
    // If the user already exists, throw an error.
    if (userExists > 0) {
      throw new IBadRequestException({
        message: userErrors.userWithEmailAlreadyExists(data.email),
      });
    }

    const {
      companyName,
      companyRole,
      companyType,
      country,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      phone,
    } = data;

    if (password !== confirmPassword) {
      throw new IBadRequestException({
        message: authErrors.passwordMismatch,
      });
    }

    const apiConsumerRole = await this.roleRepository.findOne({
      where: {
        slug: ROLES.API_CONSUMER,
      },
      select: {
        id: true,
      },
    });

    let user: User | undefined;
    let company: Company | undefined;
    let profile: Profile | undefined;

    if (apiConsumerRole) {
      const result = await Promise.allSettled([
        new Promise((res, rej) => {
          this.companyRepository
            .save({
              name: companyName,
              type: companyType,
            })
            .then((companyCreated) => {
              if (companyCreated) {
                company = companyCreated;
                return this.userRepository.save({
                  email: email.trim().toLowerCase(),
                  password: hashSync(password, 12),
                  roleId: apiConsumerRole.id,
                  companyId: companyCreated.id,
                });
              }
            })
            .then((userCreated) => {
              if (userCreated) {
                user = userCreated;
                return this.profileRepository.save({
                  firstName,
                  lastName,
                  phone,
                  country,
                  companyRole,
                  userId: userCreated.id,
                });
              }
            })
            .then((profileCreated) => {
              if (profileCreated) {
                profile = profileCreated;
              }
              res('');
            })
            .catch((err) => {
              rej(err);
            });
        }),
      ]);

      if (result[0].status === 'rejected') {
        throw new IBadRequestException({
          message: authErrors.errorOccurredCreatingUser,
          _meta: result[0].reason,
        });
      }

      if (user) {
        user.profileId = profile?.id;

        await this.userRepository.save(user);
      }
    }

    return ResponseFormatter.success('', { ...user, profile, company });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new IBadRequestException({
        message: userErrors.userWithEmailNotFound(email),
      });
    }

    if (!compareSync(password, user.password)) {
      throw new IBadRequestException({
        message: authErrors.invalidCredentials,
      });
    }

    const accessToken = await this.auth.sign({ id: user.id });

    return ResponseFormatter.success('Successfully logged in.', accessToken);
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new IBadRequestException({
        message: userErrors.userWithEmailNotFound(email),
      });
    }

    const { hashedResetToken, resetToken } =
      await this.auth.getResetPasswordToken();

    await this.userRepository.update(
      { id: user.id },
      {
        resetPasswordToken: hashedResetToken,
        resetPasswordExpires: moment().add(10, 'minutes').toDate(),
      },
    );

    return ResponseFormatter.success(
      `Reset password email sent to ${email}`,
      resetToken,
    );
  }

  async resetPassword(
    { confirmPassword, password }: ResetPasswordDto,
    user: User,
  ): Promise<ApiResponse<null>>;
  async resetPassword(
    { confirmPassword, password }: ResetPasswordDto,
    resetToken: string,
  ): Promise<ApiResponse<null>>;
  async resetPassword(
    { confirmPassword, password }: any,
    userOrToken: any,
  ): Promise<any> {
    let userToUpdate: User | null =
      userOrToken instanceof User ? userOrToken : null;

    if (!userToUpdate) {
      const resetPasswordToken = createHash('sha256')
        .update(userOrToken)
        .digest('hex');

      userToUpdate = await this.userRepository.findOneBy({
        resetPasswordToken,
        resetPasswordExpires: MoreThan(moment().toDate()),
      });

      if (!userToUpdate) {
        throw new IBadRequestException({
          message: authErrors.resetPasswordInvalid,
        });
      }
    }

    if (password !== confirmPassword) {
      throw new IBadRequestException({
        message: authErrors.passwordMismatch,
      });
    }

    await this.userRepository.update(
      { id: userToUpdate?.id },
      {
        resetPasswordToken: null as any,
        resetPasswordExpires: null as any,
        password: hashSync(password, 12),
        lastPasswordChange: moment().toDate(),
      },
    );

    return ResponseFormatter.success(
      userOrToken instanceof User
        ? 'Your password has been successfully changed.'
        : 'Your password has been successfully reset. Please proceed to login.',
    );
  }
}
