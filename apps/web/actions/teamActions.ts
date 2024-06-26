// 'use server'

// import { axiosRequest } from "@/config/axiosRequest";
// import * as API from '../config/endpoints';
// import { deleteCookies } from "@/config/cookies";
// import { redirect } from "next/navigation";

// /* INVITE MEMBER */
// export async function postInviteMember(prevState: any, formData: FormData) {
//   const fullData = {
//     email: formData.get('email'),
//     roleId: formData.get('role')
//   }

//   let response = await axiosRequest({
//     apiEndpoint: API.postTeam(),
//     method: 'POST',
//     headers: { },
//     data: { 
//       email: fullData?.email, 
//       roleId: fullData?.roleId
//     }
//   });

//   if (response?.status == 201) {
//     // return { message: 'You sent an invite to [email_address]' };
//     return { response }
//   } else if ([401]?.includes(Number(response?.status))) { 
//     deleteCookies('aperta-user-accessToken');
//     redirect('/');
//   } else {
//     return { response }
//   }
// }

// /* CREATE ROLE */
// export async function postCreateRole(prevState: any, formData: FormData) {
//   const fullData = {
//     name: formData.get('role_name'),
//     description: formData.get('description'),
//     permissions: formData.get('permissions')
//   }

//   // @ts-ignore
//   let sanitizedPermissions = JSON.parse(fullData?.permissions)?.flatMap(item => item.options.map(option => option.id))

//   let response = await axiosRequest({
//     apiEndpoint: API.postRole(),
//     method: 'POST',
//     headers: { },
//     data: { 
//       name: fullData?.name, 
//       description: fullData?.description,
//       permissions: sanitizedPermissions,
//       status: "active",
//     }
//   });

//   if ([401]?.includes(Number(response?.status))) { 
//     deleteCookies('aperta-user-accessToken');
//     redirect('/');
//   } else {
//     return { response }
//   }
// }

// /* UPDATE ROLE */
// export async function updateRole(prevState: any, formData: FormData) {
//   const fullData = {
//     name: formData.get('role_name'),
//     description: formData.get('description'),
//     permissions: formData.get('permissions')
//   }

//   let response = await axiosRequest({
//     apiEndpoint: API.updateRole({
//       id: prevState?.role_id
//     }),
//     method: 'PATCH',
//     headers: { },
//     data: { 
//       description: fullData?.description,
//       status: "active",
//     }
//   });

//   // @ts-ignore
//   if (fullData?.permissions?.length >= 3 && response?.status == 200) {
//     let role_id = prevState?.role_id;
//     // @ts-ignore
//     let sanitizedPermissions = JSON.parse(fullData?.permissions)?.flatMap(item => item.options.map(option => option.id))
//     // console.log('Check the console', sanitizedPermissions, fullData?.permissions)

//     await axiosRequest({
//       apiEndpoint: API.putRolePermission({ id: role_id }),
//       method: 'PUT',
//       headers: { },
//       data: {
//         permissions: sanitizedPermissions
//       }
//     });
    
//     return { response }
//   } else if ([401]?.includes(Number(response?.status))) { 
//     deleteCookies('aperta-user-accessToken');
//     redirect('/');
//   } else {
//     return { response }
//   }
// }