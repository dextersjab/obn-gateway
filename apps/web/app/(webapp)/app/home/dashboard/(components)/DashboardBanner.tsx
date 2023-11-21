'use client'

import { AppRightModal } from '@/app/(webapp)/(components)';
import { Button } from '@/components/globalComponents'
import Image from 'next/image';
import React, { useState } from 'react'
import { AddBusinessInformation } from '.';

const DashboardBanner = () => {
  const [openModal, setOpenModal] = useState(false);
  const close_modal = Boolean(localStorage.getItem('close-dashboard-modal'));
  const [closeDashboardModal, setCloseDashboardModal] = useState(close_modal);

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      {
        openModal &&
          <AppRightModal
            title={'Add Business Information'}
            effect={closeModal}
            childrenStyle='!px-0'
          >
            <AddBusinessInformation 
              close={closeModal}
              next={closeModal}
            />
          </AppRightModal>
      }

      {
        (!closeDashboardModal) ?
          <section className='w-full relative overflow-hidden flex items-center justify-between rounded-[12px] bg-[#F3F6FB] border-[#DCE4F4]'>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className='absolute cursor-pointer top-[14px] right-[14px]'
              onClick={() => {
                localStorage.setItem('close-dashboard-modal', 'yes');
                setCloseDashboardModal(true);
              }}
            >
              <path 
                d="M15 5L5 15M5 5L15 15" 
                stroke="#2B2E36" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill='transparent' 
              />
            </svg>

            <div className='p-[20px] gap-[20px] w-full flex flex-col'>
              <div className='w-full flex flex-col gap-[8px]'>
                <h2 className='w-full text-f18 font-[600] text-o-text-dark'>
                  Complete Your Account Setup
                </h2>

                <div className='text-f14 text-o-text-dark'>
                  Provide your business information to get 
                  your Aperta account up and running.
                </div>
              </div>

              <Button 
                title={'Add business information'}
                effect={() => setOpenModal(true)}
                small
                containerStyle='!w-[200px]'
              />
            </div>

            <div className='w-full flex items-center pt-[19px] justify-end pr-[51px]'>
              <Image 
                src='/images/account_setup.png'
                alt='status'
                loading='lazy'
                width={290}
                height={170}
                className='object-cover absolute'
              />
            </div>
          </section>
          : null
      }
    </>
  )
}

export default DashboardBanner