import React from 'react'
import { TwoFactorAuthForm } from '../../(components)'
import Link from 'next/link'

const TwoFactorAuthPage = () => {
  return (
    <section className='w-full flex flex-col gap-[32px]'>
      <h2 className='text-o-text-dark text-f28 font-[600]'>
        Sign In
      </h2>
      
      <div className='w-full flex flex-col gap-[32px]'>
        <div className='flex w-full flex-col gap-[24px]'>
          <div className='flex w-full flex-col gap-[12px]'>
            <h3 className='text-o-text-dark text-f18 font-[500]'>
              Two-Factor Authentication
            </h3>
            <div className='text-o-text-medium3 text-f14'>
              You have two-factor authentication set up on your account for added security. 
              <br /><br />
              Enter the six-digit code from your authenticator app on your registered mobile device.
            </div>
          </div>

          <TwoFactorAuthForm />
        </div>

        <Link
          href={'/signin/backup-code'}
          className='text-f13 font-[600] w-fit text-o-light-blue' 
        >
          Or, use a backup code.
        </Link>
      </div>
    </section>
  )
}

export default TwoFactorAuthPage