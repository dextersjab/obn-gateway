import { UrlParamsProps } from '@/types/webappTypes/appTypes'
import React from 'react'
import { DownStreamForm, EnabledToggle, TransformationForm, UpstreamForm } from '../../(components)';
import { applyAxiosRequest } from '@/hooks';
import * as API from '@/config/endpoints';
import Logout from '@/components/globalComponents/Logout';
import { StatusBox } from '@/app/(webapp)/(components)';
import { ToggleSwitch } from '@/components/forms';
import { getCookies } from '@/config/cookies';

const APIConfigurationPage = async({ params, searchParams }: UrlParamsProps) => {
  const api_id = searchParams?.api_id || '';
  const preview = searchParams?.preview || '';
  const environment = getCookies('environment');

  const fetchedAPI: any = await applyAxiosRequest({
    headers: {},
    apiEndpoint: API.getAPI({
      environment: environment || 'development',
      id: api_id
    }),
    method: 'GET',
    data: null
  })

  const fetchedProfile: any = await applyAxiosRequest({
    headers: {},
    apiEndpoint: API.getProfile(),
    method: 'GET',
    data: null
  });

  if (fetchedAPI?.status == 401) {
    return <Logout />
  }

  let apiDetails = fetchedAPI?.data;
  let profile = fetchedProfile?.data;
  const userType = profile?.user?.role?.parent?.slug;

  return (
    <section className='w-full gap-[20px] flex flex-col h-full'>
      <div className='w-full flex items-center justify-between'>
        <h3 className='w-full text-f18 font-[500] text-o-text-dark'>
          {
            preview == 'true' ?
              'API' :
              'API Configuration'
          }
        </h3>

        {
          preview == 'true' ?
            <StatusBox 
              status={apiDetails?.enabled ? 'enabled' : 'disabled'} 
            />
            :
            <EnabledToggle
              profileData={profile}
              rawData={apiDetails}
            />
        }
      </div>

      {
        // !(userType == 'api-consumer') &&
        <>
          <DownStreamForm 
            rawData={apiDetails}
          />
          <UpstreamForm 
            rawData={apiDetails}
            profileData={profile}
            preview={preview}
          />
        </>
      }
      
      <TransformationForm 
        rawData={apiDetails}
        profileData={profile}
        preview={preview}
      />
    </section>
  )
}

export default APIConfigurationPage