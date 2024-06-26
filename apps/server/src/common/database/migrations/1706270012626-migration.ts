import {
  EmailSettingsInterface,
  GeneralSettingsInterface,
  SETTINGS_TYPES,
} from '../../../settings/types';
import {
  BUSINESS_SETTINGS_NAME,
  defaultBusinessSettings,
} from '../../../settings/settings.constants';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const defaultEmailSettings: EmailSettingsInterface = {
  emailBaseUrl: { value: '' },
  emailFrom: { value: (process.env.EMAIL_FROM as string) || '' },
  emailHost: { value: (process.env.EMAIL_HOST as string) || '' },
  emailPassword: { value: (process.env.EMAIL_PASSWORD as string) || '' },
  emailPort: { value: (process.env.EMAIL_PORT as string) || '' },
  emailSecure: { value: (process.env.EMAIL_SECURE as string) === 'true' ?? '' },
  emailUser: { value: (process.env.EMAIL_USER as string) || '' },
};

const defaultGeneralSettings: GeneralSettingsInterface = {
  authTokenExpirationDuration: {
    type: 'time',
    unit: 'secs',
    value: 30,
  },
  failedLoginAttempts: {
    type: 'count',
    value: 30,
  },
  inactivityTimeout: {
    type: 'time',
    unit: 'mins',
    value: 5,
  },
  invitationTokenExpirationDuration: {
    type: 'time',
    unit: 'mins',
    value: 30,
  },
  passwordResetTokenExpirationDuration: {
    type: 'time',
    unit: 'mins',
    value: 10,
  },
  requestTimeout: {
    type: 'time',
    unit: 'secs',
    value: 30,
  },
  twoFaExpirationDuration: {
    type: 'time',
    unit: 'mins',
    value: 10,
  },
};

export class Migration1706270012626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const parameters = [
      [
        uuidv4(),
        SETTINGS_TYPES.EMAIL_SETTINGS,
        JSON.stringify(defaultEmailSettings),
      ],
      [
        uuidv4(),
        SETTINGS_TYPES.GENERAL_SETTINGS,
        JSON.stringify(defaultGeneralSettings),
      ],
      [
        uuidv4(),
        BUSINESS_SETTINGS_NAME,
        JSON.stringify(defaultBusinessSettings),
      ],
    ];

    await queryRunner.query(
      `INSERT INTO system_settings (id, name, value) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)`,
      [parameters],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
