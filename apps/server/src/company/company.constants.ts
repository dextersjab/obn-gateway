import { CompanyTypes } from '@common/database/constants';

// const sharedFields: Record<string, { type: string; label: string }> = {
//   firstName: { label: 'First Name', type: 'text' },
//   lastName: { label: 'Last Name', type: 'text' },
//   companyType: { label: 'User Type', type: 'dropdown' },
// };

export const companyCustomFields: Omit<
  Record<CompanyTypes, Record<string, { type: string; label: string }>>,
  'api-provider'
> = {
  business: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
    confirmPassword: { label: 'Confirm Password', type: 'password' },
    phone: { label: 'Phone Number', type: 'password' },
    accountNumber: { label: 'Account Number', type: 'text' },
    businessName: { label: 'Corporate Name', type: 'text' },
    rcNumber: {
      label: 'CAC (Corporate Affairs Commission) Number',
      type: 'text',
    },
    companySubType: { label: 'Company Type', type: 'dropdown' },
  },
  individual: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
    confirmPassword: { label: 'Confirm Password', type: 'password' },
    phone: { label: 'Phone Number', type: 'password' },
    accountNumber: { label: 'Account Number', type: 'text' },
    bvn: { label: 'BVN', type: 'text' },
  },
  licensedEntity: {
    email: { label: 'Official Email Address', type: 'email' },
    password: { label: 'Password', type: 'password' },
    confirmPassword: { label: 'Confirm Password', type: 'password' },
    phone: { label: 'Phone Number', type: 'password' },
    businessName: { label: 'Company Name', type: 'text' },
    companySubType: { label: 'Company Type', type: 'dropdown' },
    companyRole: { label: 'Company Role', type: 'text' },
  },
};