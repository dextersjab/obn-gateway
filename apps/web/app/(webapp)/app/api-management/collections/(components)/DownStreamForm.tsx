'use client'

import { InputElement } from '@/components/forms'
import { APIConfigurationProps } from '@/types/webappTypes/appTypes';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const DownStreamForm = ({
  rawData,
  profileData
}: APIConfigurationProps) => {

  const [api_name, setApiName] = useState('');
  const [request_method, setRequestMethod] = useState('');
  const [tier, setTier] = useState('');
  const [path, setPath] = useState('');
  const [currentValue, setCurrentValue] = useState('header');
  const [currentResValue, setCurrentResValue] = useState('body');

  useEffect(() => {
    setApiName(rawData?.name || '');
    setRequestMethod(rawData?.downstream?.method?.toString());
    setTier('');
    setPath(rawData?.downstream?.path?.toString());
  }, []);

  const request = rawData?.downstream?.request;
  const response = rawData?.downstream?.response;
  const responseBody = response?.['0']?.body;

  const applyStyle = (key: string, value: any, depth = 0): string => {
    const indentation = ' '.repeat(depth * 2);

    if (typeof value === 'object' && value !== null) {
      const styledObject = Object.keys(value).map(innerKey => {
        const innerValue = value[innerKey];
        return applyStyle(innerKey, innerValue, depth + 1);
      });
      if (!styledObject.length) return `${indentation}<span style='color: #D01B3F;'>"${key}"</span>: {}`;
      return `${indentation}<span style='color: #D01B3F;'>"${key}"</span>: {<br>${styledObject.join(',<br>')}<br>${indentation}}`;
    } else {
      return `<span style='color: #4BA07A;'>${typeof value === "string" ? value?.replace(/\"/g, '"')?.replace(/\\n/g, '\n') : value}</span>`;
    }
  };

  const transform = (obj: any) => {
    const style = Object.keys(obj).map(key => {
      const value = obj[key];
      return applyStyle(key, value, 1);
    });
    return `${style.join(',<br>')}${style.length > 0 ? '<br>' : ''}`;
  };

  console.log(request, response);

  return (
    <div className='w-full'>
      {
        (profileData == 'api-consumer') ?
          <div className='flex flex-col gap-[20px]'>
            <div className='flex items-start w-full justify-between gap-[40px] pb-[20px] border-b border-o-border'>
              <div className='w-[40%] text-f14 font-[500] text-o-text-dark'>
                Request
              </div>

              <div className='flex bg-white overflow-x-auto rounded-[12px] border border-o-border gap-[16px] flex-col p-[24px] w-[60%]'>
                <div className='flex justify-between items-center'>
                  <div className='w-fit text-f13 p-2 rounded-[6px] border border-o-border bg-o-bg2'>
                    {request?.method}
                  </div>
                </div>

                <div className='flex items-center gap-5 border-b border-o-border'>
                {
                  (request?.body ? 
                    [{ id: 1, value: 'header' },{ id: 2, value: 'body' }] 
                    : [{ id: 1, value: 'header' }]
                  )
                    ?.map((data) => (
                    <div 
                      key={data?.id} 
                      className='relative whitespace-nowrap w-fit flex flex-col px-[4px] pt-[9px] pb-[11px]'
                    >
                      <div 
                        className={`${currentValue == data?.value ? 'text-o-blue font-[500]' : 'text-o-text-medium3'} 
                        capitalize text-f14 flex items-center gap-3 hover:text-o-blue`}
                      >
                        <div 
                          onClick={() => setCurrentValue(data?.value)}
                          className='w-fit cursor-pointer capitalize'
                        >
                          {data?.value}
                        </div>
                      </div>

                      {
                        currentValue == data?.value &&
                        <motion.div
                          className='pane-underline'
                          layoutId='top-pane-underline'
                        ></motion.div>
                      }
                    </div>
                  ))
                }
                </div>

                {
                  currentValue == 'header' ?
                    <pre dangerouslySetInnerHTML={{
                      __html: transform({ header: request?.header })
                    }} />
                    :
                    <pre dangerouslySetInnerHTML={{
                      __html: transform(request?.body ? { body: request?.body?.raw} : { })
                    }} />
                }
              </div>
            </div>

            <div className='flex items-start w-full justify-between gap-[40px] pb-[20px] border-b border-o-border'>
              <div className='w-[40%] text-f14 font-[500] text-o-text-dark'>
                Response
              </div>

              <div className='flex bg-white overflow-x-auto rounded-[12px] border border-o-border gap-[16px] flex-col p-[24px] w-[60%]'>
                <div className='flex justify-between items-center'>
                  <div className='w-fit text-f13 p-2 rounded-[6px] border border-o-border bg-o-bg2'>
                    JSON
                  </div>
                  <div className='w-fit text-f13 flex text-o-text-muted'>
                    {
                      response?.['0']?.code ?
                        `Code: ${response?.['0']?.code}` :
                        ''
                    }
                  </div>
                </div>

                <div className='flex items-center gap-5 border-b border-o-border'>
                {
                  ([{ id: 1, value: 'body' },{ id: 2, value: 'Request URL' }])
                    ?.map((data) => (
                    <div 
                      key={data?.id} 
                      className='relative whitespace-nowrap w-fit flex flex-col px-[4px] pt-[9px] pb-[11px]'
                    >
                      <div 
                        className={`${currentResValue == data?.value ? 'text-o-blue font-[500]' : 'text-o-text-medium3'} 
                        capitalize text-f14 flex items-center gap-3 hover:text-o-blue`}
                      >
                        <div 
                          onClick={() => setCurrentResValue(data?.value)}
                          className='w-fit cursor-pointer capitalize'
                        >
                          {data?.value}
                        </div>
                      </div>

                      {
                        currentResValue == data?.value &&
                        <motion.div
                          className='pane-underline'
                          layoutId='top-pane-underline'
                        ></motion.div>
                      }
                    </div>
                  ))
                }
                </div>

                {
                  currentResValue == 'body' &&
                  <pre dangerouslySetInnerHTML={{
                    __html: transform({ responseBody })
                  }} />
                }

                {
                  currentResValue == 'Request URL' &&
                  <div className='text-f14 text-o-text-dark'>
                    {rawData?.downstream?.url}
                  </div>
                }
              </div>

            </div>
          </div>
          :
          <div 
            className='flex items-start w-full justify-between gap-[40px] pb-[20px] border-b border-o-border'
          >
            <div className='w-[40%] text-f14 font-[500] text-o-text-dark'>
              Downstream Service
            </div>

            <div className='flex bg-white rounded-[12px] border border-o-border gap-[16px] flex-col p-[24px] w-[60%]'>
              <InputElement 
                name='api_name'
                type='text'
                placeholder=''
                label='API Name'
                disabled
                value={api_name}
                required
              />
              <InputElement 
                name='request_method'
                type='text'
                placeholder=''
                label='Method'
                disabled
                value={request_method}
                required
              />
              {/* <InputElement 
                name='tier'
                type='text'
                placeholder=''
                label='Tier'
                disabled
                value={tier}
                required
              /> */}
              <InputElement 
                name='path'
                type='text'
                placeholder=''
                label='Path'
                disabled
                value={path}
                required
              />
            </div>
          </div>
      }
    </div>
  )
}

export default DownStreamForm