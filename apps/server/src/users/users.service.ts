import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/common/database/entities';
import { Repository } from 'typeorm';
import { RequestContextService } from 'src/common/utils/request/request-context.service';
import { IBadRequestException } from 'src/common/utils/exceptions/exceptions';
import { ResponseFormatter } from 'src/common/utils/common/response.util';
import { userErrors } from 'src/common/constants/errors/user.errors';
import { roleErrors } from 'src/common/constants/errors/role.errors';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  USER_EVENTS,
  UserCreatedEvent,
  UserDeletedEvent,
  UserUpdatedEvent,
} from 'src/shared/events/user.event';

@Injectable()
export class UsersService {
  constructor(
    private readonly requestContext: RequestContextService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(data: CreateUserDto) {
    const { email, firstName, lastName, roleId } = data;

    const userExists = await this.userRepository.count({
      where: { email },
    });

    if (userExists) {
      throw new IBadRequestException({
        message: userErrors.userWithEmailAlreadyExists(data.email),
      });
    }

    const role = await this.roleRepository.findOne({
      where: { id: roleId, parentId: this.requestContext.user!.role.parentId },
      relations: { permissions: true },
    });

    if (!role) {
      throw new IBadRequestException({
        message: roleErrors.roleNotFound,
      });
    }

    const user = await this.userRepository.save(
      this.userRepository.create({
        email,
        roleId,
        password: '',
        companyId: this.requestContext.user!.companyId,
        profile: {
          firstName,
          lastName,
        },
      }),
    );

    this.eventEmitter.emit(
      USER_EVENTS.USER_CREATED,
      new UserCreatedEvent(user),
    );

    return ResponseFormatter.success('', user);
  }

  async listUsers() {
    const users = await this.userRepository.find({
      where: { companyId: this.requestContext.user!.companyId },
      relations: { profile: true },
    });
    return ResponseFormatter.success('', users);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, companyId: this.requestContext.user!.companyId },
      relations: { profile: true },
    });

    if (!user) {
      throw new IBadRequestException({
        message: userErrors.userNotFound,
      });
    }

    return ResponseFormatter.success('', user);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const { firstName, lastName, status, roleId } = data;

    const user = await this.userRepository.findOne({
      where: { id, companyId: this.requestContext.user!.companyId },
    });

    if (!user) {
      throw new IBadRequestException({
        message: userErrors.userNotFound,
      });
    }

    await this.userRepository.update(
      { id: user.id },
      this.userRepository.create({
        roleId,
        status,
        profile: {
          firstName,
          lastName,
        },
      }),
    );

    this.eventEmitter.emit(
      USER_EVENTS.USER_UPDATED,
      new UserUpdatedEvent(user),
    );

    return ResponseFormatter.success('', user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, companyId: this.requestContext.user!.companyId },
    });

    if (!user) {
      throw new IBadRequestException({
        message: userErrors.userNotFound,
      });
    }

    await this.userRepository.softDelete({ id: user.id });

    this.eventEmitter.emit(
      USER_EVENTS.USER_DELETED,
      new UserDeletedEvent(user),
    );

    return ResponseFormatter.success('', null);
  }
}
