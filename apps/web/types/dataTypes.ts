export interface ConsumerStatusDataProps {
  all?: number; 
  approved?: number;
  pending?: number; 
  active?: number; 
  inactive?: number; 
  denied?: number;
};

export interface ReportingDataProps {
  total_processed?: number;
  successful?: number;
  failed?: number;
  request_latency?: number;
  gateway_latency?: number;
  latency?: number;
}

export interface ConsentsStatusDataProps {
  all?: number; 
  approved?: number; 
  pending?: number;  
  revoked?: number;
  declined?: number;
}

export interface SettingsInputProps {
  type: string;
  value: any;
  unit?: string;
}

export interface GeneralSettingsDataProps {
  inactivityTimeout: SettingsInputProps;
  requestTimeout: SettingsInputProps;
  authTokenExpirationDuration: SettingsInputProps;
  passwordResetTokenExpirationDuration: SettingsInputProps;
  twoFaExpirationDuration: SettingsInputProps;
  invitationTokenExpirationDuration: SettingsInputProps;
  failedLoginAttempts: SettingsInputProps;
}

export interface ClientIdDataProps {
  clientId: string
}

export interface BusinessInformationDataProps {
  cac: string,
  tin: string,
  regulator_license: string,
  regulator_license_file: string,
  regulator_license_file_type: string,
  certificate_of_incorporation: string,
  certificate_of_incorporation_file: string,
  certificate_of_incorporation_file_type: string,
  company_status_report: string,
  company_status_report_file: string;
  company_status_report_file_type: string;
}

export interface UserAgreementsProps {
  privacyPolicy: string;
  termsAndConditions: string;
}

export interface OnboardingSettingsProps {
  business: any;
  licensedEntity: any;
  individual: any;
}

export interface EmailServiceProps {
  emailBaseUrl: string,
  emailFrom: string,
  emailHost: string,
  emailPassword: string,
  emailPort: string,
  emailSecure?: boolean,
  emailUser: string,
}

export interface ExternalServicesProps {
  url: string;
  api_key: string;
  urlDescription?: string;
  apiKeyDescription?: string;
}

export interface MockServicesProps {
  mock_url: string;
  mockUrlDescription?: string;
}

export interface MembersStatusProps {
  all?: number;
  invited?: number;
  active?: number;
  inactive?: number;
}

export interface TestModeConfigurationProps {
  test_secret_key?: string;
  name?: string;
  description?: string;
  test_api_key?: string;
  webhook_url?: string;
  callback_url?: string;
  ip_whitelist?: string;
  timeout?: string;
  clientId?: string
}

export interface LiveModeConfigurationProps {
  secret_key?: string;
  name?: string;
  description?: string;
  api_key?: string;
  webhook_url?: string;
  callback_url?: string;
  ip_whitelist?: string;
  timeout?: string;
  clientId?: string
}

export interface StatDataProps {
  count: any,
  value: string;
}

export interface UsersStatProps {
  active: StatDataProps;
  inactive: StatDataProps;
  pending: StatDataProps;
}

export interface APICollectionStatsProps {
  collections: StatDataProps;
  apis: StatDataProps;
}

export interface APICallsProps {
  success: any;
  total: any;
  failed: any;
}