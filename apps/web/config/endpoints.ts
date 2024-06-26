import { DateFilterProps, GetEnvironmentProps, GetListProps, 
  GetSingleEnvironmentProps, GetSingleProps, GetTypeProps, 
  PostTokenProps, 
} from "@/types/endpointTypes";

const BASE_URL = process.env.BASE_API_ENDPOINT || process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;


// AUTH
export const getAgreements = () => `${BASE_URL}/agreements`;
export const refreshToken = () => `${BASE_URL}/auth/token`;
export const postSignup = () => `${BASE_URL}/auth/signup`;
export const postVerfiyEmail = () => `${BASE_URL}/auth/email/verify`;
export const postLoginWith2FA = () => `${BASE_URL}/auth/login/two-fa`;
export const postLogin = () => `${BASE_URL}/auth/login`;
export const postInitiatePasswordReset = () => `${BASE_URL}/auth/password/forgot`;
export const postResetPassword = ({ token }: PostTokenProps) => 
  `${BASE_URL}/auth/password/reset/${token}`;
export const postAccountSetUp = ({ token }: PostTokenProps) => 
  `${BASE_URL}/auth/setup/${token}`;


// ROLES
export const getRolePermission = ({ id }: GetSingleProps) => 
  `${BASE_URL}/roles/${id}/permissions`
export const getPermissions = () => `${BASE_URL}/roles/permissions`
export const getRoles = ({ page, limit, name, status }: GetListProps) => 
  `${BASE_URL}/roles?page=${page}${limit ? `&limit=${limit}`: ''}${status ? `&filter[status]=${status}`: ''}${name ? `&filter[name]=${name}`: ''}`;
export const postRole = () => `${BASE_URL}/roles`;
export const updateRole = ({ id }: GetSingleProps) => 
  `${BASE_URL}/roles/${id}`
export const putRolePermission = ({ id }: GetSingleProps) => 
  `${BASE_URL}/roles/${id}/permissions`;


// TEAMS
export const postTeam = () => `${BASE_URL}/users`;
export const postReinviteMember = ({ id }: GetSingleProps) => `${BASE_URL}/users/${id}/resend`;
export const getTeamStats = () => `${BASE_URL}/users/stats`;
export const getTeams = ({ page, limit, name, status, email, role }: GetListProps) => 
  `${BASE_URL}/users?page=${page}${limit ? `&limit=${limit}`: ''}${name ? `&filter[name]=${name}`: ''}${role ? `&filter[roleId]=${role}`: ''}${email ? `&filter[email]=${email}`: ''}${status ? `&filter[status]=${status}`: ''}`;
export const updateTeam = ({ id }: GetSingleProps) => 
  `${BASE_URL}/users/${id}`;
export const getTeam = ({ id }: GetSingleProps) => 
  `${BASE_URL}/users/${id}`;

  
// PROFILE
export const getProfile = () => `${BASE_URL}/profile`;
export const updateProfile = () => `${BASE_URL}/profile`;
export const updatePassword = () => `${BASE_URL}/profile/password`;
export const postSetup2FA = () => `${BASE_URL}/profile/two-fa`;
export const verify2FA = () => `${BASE_URL}/profile/two-fa`;
export const disable2FA = () => `${BASE_URL}/profile/two-fa/disable`;


// AUDIT TRAIL
export const getAuditLog = ({ id }: GetSingleProps) => 
  `${BASE_URL}/audit-trail/${id}`;
export const getAuditTrails = ({ page, limit, event, createdAt_gt, createdAt_l, name }: GetListProps) => 
  `${BASE_URL}/audit-trail?page=${page}${limit ? `&limit=${limit}`: ''}${event ? `&filter[event]=${event}`: ''}${createdAt_gt ? `&filter[createdAt][gte]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lte]=${createdAt_l}`: ''}${name ? `&filter[name]=${name}`: ''}`
export const getAuditTypes = () => 
    `${BASE_URL}/audit-trail/types`

// COLLECTIONS
export const getCollections = () => 
  `${BASE_URL}/collections`;
export const getCollection = ({ id }: GetSingleProps) => 
  `${BASE_URL}/collections/${id}`;
export const getCompanyCollections = ({ page, limit, environment }: GetEnvironmentProps) => 
  `${BASE_URL}/collections/${environment}/company?page=${page}${limit ? `&limit=${limit}`: ''}`;
export const getCompanyCollectionsById = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/collections/${environment}/company/${id}`;


// APIS 
export const postAPIs = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}`;
export const getAPIs = ({ page, limit, environment, collectionId, name, method }: GetEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}?page=${page}${limit ? `&limit=${limit}`: ''}${name ? `&filter[name]=${name}`: ''}${method ? `&filter[method]=${method}`: ''}${collectionId ? `&filter[collectionId]=${collectionId}` : ''}`;
export const getAPI = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/${id}`;
export const deleteAPI = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/${id}`;
export const updateAPI = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/${id}`;
export const getAPILogs = ({ page, limit, environment, companyId, referenceId, apiId, createdAt_gt, createdAt_l, status }: GetEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/logs${referenceId ? `/${referenceId}` : ''}?page=${page}${limit ? `&limit=${limit}`: ''}${apiId ? `&filter[apiId]=${apiId}` : ''}${companyId ? `&filter[companyId]=${companyId}` : ''}${createdAt_gt ? `&filter[createdAt][gt]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lt]=${createdAt_l}`: ''}${status ? `&filter[status]=${status}`: ''}`;
export const getAPILog = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/logs/${id}`;
export const postAssignAPIs = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/company/${id}/assign`;
export const postUnassignAPIs = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/company/${id}/unassign`;
export const getCompanyAPIs = ({ page, limit, environment, name, companyId }: GetEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/company/${companyId}?page=${page}${limit ? `&limit=${limit}`: ''}${name ? `&filter[name]=${name}`: ''}`;
export const updateAPITransformation = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/${id}/transformation`;
export const getAPITransformation = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/${id}/transformation`;
export const updateConsumerAPIAccess = ({ environment, id }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/apis/${environment}/company/${id}`;
export const getAPIsForCompany = ({ environment, collectionId, name, method }: GetSingleEnvironmentProps) =>
  `${BASE_URL}/apis/${environment}/company${collectionId ? `?filter[collectionId]=${collectionId}` : ''}${name ? `&filter[name]=${name}`: ''}${method ? `&filter[method]=${method}`: ''}`
export const getAPILogStats = ({ page, limit, environment, companyId, apiId, createdAt_gt, createdAt_l }: GetEnvironmentProps) => 
	`${BASE_URL}/apis/${environment}/logs/stats?page=${page}${limit ? `&limit=${limit}`: ''}${apiId ? `&filter[apiId]=${apiId}` : ''}${createdAt_gt ? `&filter[createdAt][gt]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lt]=${createdAt_l}`: ''}${companyId ? `&filter[companyId]=${companyId}` : ''}`
export const getAPILogStatsAggregate = ({ page, limit, environment, companyId, apiId, createdAt_gt, createdAt_l }: GetEnvironmentProps) => 
	`${BASE_URL}/apis/${environment}/logs/stats/periodic-aggregate?page=${page}${limit ? `&limit=${limit}`: ''}${apiId ? `&filter[apiId]=${apiId}` : ''}${createdAt_gt ? `&filter[createdAt][gt]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lt]=${createdAt_l}`: ''}${companyId ? `&filter[companyId]=${companyId}` : ''}`
  

// COMPANY
export const getCompanies = ({ page, limit, name, createdAt_gt, kybStatus, createdAt_l, status }: GetListProps) => 
  `${BASE_URL}/companies?page=${page}${limit ? `&limit=${limit}`: ''}${createdAt_gt ? `&filter[createdAt][gte]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lte]=${createdAt_l}`: ''}${status ? `&filter[status]=${status}`: ''}${kybStatus ? `&filter[kybStatus]=${kybStatus}`: ''}${name ? `&filter[name]=${name}`: ''}`;
export const getCompany = ({ id }: GetSingleProps) => 
  `${BASE_URL}/companies/${id}`;
export const activateCompany = ({ id }: GetSingleProps) => 
  `${BASE_URL}/companies/${id}/activate`;
export const deactivateCompany = ({ id }: GetSingleProps) => 
  `${BASE_URL}/companies/${id}/deactivate`;
export const updateCompanyStatus = ({ id }: GetSingleProps) => 
  `${BASE_URL}/companies/${id}/kyb/status`;
export const updateCompanyDetails = () => `${BASE_URL}/company/kyb`;
export const getCompanyTypes = () => `${BASE_URL}/company/types`;
export const getCompanyRequiredFields = ({ type }: GetTypeProps) => 
  `${BASE_URL}/company/${type}/fields`
export const getCompanyDetails = () => `${BASE_URL}/company/me`;
export const getCompanyStats = ({ createdAt_gt, createdAt_l }: DateFilterProps) => 
  `${BASE_URL}/companies/stats${createdAt_gt ? `?filter[createdAt][gt]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lt]=${createdAt_l}`: ''}`
export const getCompanyKybStats = ({ createdAt_gt, createdAt_l }: DateFilterProps) => 
  `${BASE_URL}/companies/stats/kyb${createdAt_gt ? `?filter[createdAt][gt]=${createdAt_gt}`: ''}${createdAt_l ? `&filter[createdAt][lt]=${createdAt_l}`: ''}`
export const getCompanyStat = () => 
  `${BASE_URL}/companies/stats`;
export const getCompanyKybStat = () => 
  `${BASE_URL}/companies/stats/kyb`;
export const getClientId = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/client/${environment}`;
export const putClientId = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/client/${environment}`;


// SETTINGS
export const updateCompanyTypes = () => `${BASE_URL}/settings/company/types`
export const getSettings = ({ type }: GetTypeProps) => 
  `${BASE_URL}/settings/${type}`; // email_templates, email_settings, and general
export const updateSettings = ({ type }: GetTypeProps) => 
  `${BASE_URL}/settings/${type}`; 
export const getIPWhitelist = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/ip-restriction/${environment}`;
export const updateIPWhitelist = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/ip-restriction/${environment}`;
export const getAPIKey = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/api-key/${environment}`
export const updateAPIKey = ({ environment }: GetSingleEnvironmentProps) => 
  `${BASE_URL}/settings/api-key/${environment}`