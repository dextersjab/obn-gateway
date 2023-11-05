'use client'

import { modifyConfigureAPI, postConfigureAPI } from '@/actions/collectionsActions'
import { RequestMethodText } from '@/app/(webapp)/(components)'
import { InputElement } from '@/components/forms'
import TextareaElement from '@/components/forms/TextareaElement'
import { Button } from '@/components/globalComponents'
import { ApiConfigurationProps } from '@/types/webappTypes/appTypes'
import React, { useState } from 'react'
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const ModifyApiConfiguration = ({
  close,
  loading,
  next,
}: ApiConfigurationProps) => {
  const [endpoint_url, setEndpointUrl] = useState('https://api.lendsqr.com/account_balance');
  const [parameters, setParameters] = useState('user_id, account_id');

  const incorrect = !endpoint_url;

  const initialState = {
    message: null,
  }

  const [state, formAction] = useFormState(modifyConfigureAPI, initialState);

  if (state?.message == 'success') {
    next();
  } else {
    toast.error(state?.message);
  }

  return (
    <form
      action={incorrect ? '' : formAction}
      className='gap-[32px] flex flex-col h-full w-full relative'
    >
      <div className='flex flex-col h-[80%] overflow-auto gap-[16px] w-full px-[20px]'>
        <section className='p-[20px] w-full rounded-[6px] border border-[#EF859A] bg-[#FCE8EC] text-o-text-dark text-f14'>
          Please be aware that modifying this API mapping configuration will affect all 
          users and systems connected to this endpoint. Changes may result in altered 
          data flow, unexpected behavior, or even service disruptions for those 
          relying on this API.
        </section>

        <section className='w-full p-[20px] flex flex-col gap-[12px] border rounded-[6px] border-o-border bg-[#F8FAFB]'>
          {/* API NAME */}
          <div className='flex items-center justify-between gap-5'>
            <div className='text-f14 w-fit text-o-text-muted2'>
              API Name
            </div>

            <div className='w-fit text-o-text-dark text-f14 font-[500]'>
              Get Transactions
            </div>
          </div>

          {/* REQUEST METHOD */}
          <div className='flex items-center justify-between gap-5'>
            <div className='text-f14 w-fit text-o-text-muted2'>
              Request Method
            </div>

            <div className='w-fit text-f14 font-[500]'>
              <RequestMethodText 
                method={'GET'}
              />
            </div>
          </div>

          {/* TIER */}
          <div className='flex items-center justify-between gap-5'>
            <div className='text-f14 w-fit text-o-text-muted2'>
              Tier
            </div>

            <div className='w-fit text-o-text-dark text-f14 font-[500]'>
              Tier 1
            </div>
          </div>
        </section>

        <InputElement 
          name='endpoint_url'
          placeholder='https://api.example.com/api_name'
          label='Endpoint URL'
          value={endpoint_url}
          changeValue={setEndpointUrl}
          required
        />

        <TextareaElement
          name='parameters'
          rows={3}
          value={parameters}
          changeValue={setParameters}
          placeholder=''
          label='Parameters (if any)'
        />
      </div>

      <div className='px-[20px] w-full min-h-[50px] mt-auto absolute bottom-0 z-[10] bg-white flex items-end justify-between'>
        <Button 
          title='Cancel'
          effect={close}
          small
          outlined
        />

        <Button 
          type='submit'
          title='Update'
          containerStyle='!w-[100px]'
          disabled={incorrect}
          small
        />
      </div>
    </form>
  )
}

export default ModifyApiConfiguration