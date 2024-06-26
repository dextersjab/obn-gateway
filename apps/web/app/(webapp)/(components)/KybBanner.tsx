'use client'

import React, { useState } from 'react'
import { AppRightModal } from '.';
import { AddBusinessInformation } from '../app/home/dashboard/(components)';
import Link from 'next/link';

const KybBanner = ({
  rawData
}: { rawData: any }) => {
  const [openModal, setOpenModal] = useState('');
  // console.log(rawData);

  const cancelModal = () => {
    setOpenModal('cancel');
  }

  const closeModal = () => {
    setOpenModal('');
  }

  return (
    <>
      {
        openModal &&
          <AppRightModal
            title={'Add Business Information'}
            effect={cancelModal}
            childrenStyle='relative !px-0'
          >
            <AddBusinessInformation 
              close={cancelModal}
              next={closeModal}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          </AppRightModal>
      }

      <section className='bg-[#FEEBCB] p-[16px] z-50 w-full flex justify-center items-centee fixed top-0 right-0 left-0 border-b-[4px] border-[#DD6B20]'>
        <div className='text-f14 text-[#2D3748]'>
          {
            rawData?.isVerified ?
              `Verification successful. You now have full access to all API features 
              and services.` :
              (
                (rawData?.kybStatus == 'pending' && rawData?.kybData?.taxIdentificationNumber) ||
                (rawData?.type == 'individual' && rawData?.kybStatus == 'pending')
              ) ?
              `Verification in progress. Your account will be verified once your 
              ${rawData?.type == 'individual' ? '' : 'business'} information is confirmed.` :
              rawData?.kybStatus == 'denied' ?
              'Verification denied. Kindly resubmit your Information' :
              `Complete your account setup by providing your business information 
              to get your Aperta account up and running.`
          }
          &#160;
          {
            (
              !rawData?.isVerified && 
              !rawData?.kybData?.taxIdentificationNumber &&
              rawData?.type != 'individual'
            ) &&
            <span 
              onClick={() => setOpenModal('add')}
              className='text-[#DD6B20] cursor-pointer font-[600]'
            >
              Add business information
            </span>
          }

          {
            (
              rawData?.kybStatus == 'denied' &&
              rawData?.type != 'individual'
            ) &&
            <Link 
              href={'/app/system-settings'}
              className='text-[#DD6B20] cursor-pointer font-[600]'
            >
              Update business information
            </Link>
          }
        </div>
      </section>
    </>
  )
}

export default KybBanner