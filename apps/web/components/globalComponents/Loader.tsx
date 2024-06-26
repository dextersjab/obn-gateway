import { LoaderProps } from '@/types/componentsTypes/globalComponents';
import React from 'react';

const Loader = ({ 
  big, 
  medium, 
  white,
  lightGreen
}: LoaderProps ) => {
  
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        background: 'transparent',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width={ big ? '50px' : medium ? '40px' : '25px' }
      height={ big ? '50px' : medium ? '40px' : '25px' }
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke={ 
          white ? '#FFFFFF' : 
            lightGreen ? '#ECFDF0' :
            '#0D0D12' 
        }
        strokeWidth='5'
        r='35'
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
      {/* [ldio] generated by https://loading.io/*/}
    </svg>
  );
};

export default Loader;