'use client'

import { OptionsProps, SelectElementProps } from '@/types/componentsTypes/forms'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { LinkButton, Loader, OutsideClicker } from '../globalComponents';
import { useRouter } from 'next/navigation';
import { deleteSearchParams, updateSearchParams } from '@/utils/searchParams';

const SelectElement = ({
  placeholder,
  medium,
  small,
  required,
  label,
  name,
  leftIcon,
  rightIcon,
  options,
  disabled,
  removeSearch,
  btnTitle,
  emptyState,
  btnPath,
  searchPlaceholder,
  disabledValue,
  loading,
  clickerStyle,
  forFilter,
  containerStyle,
  labelStyle,
  fieldStyle,
  optionStyle,
  invalid,
  hint,
  multiple,
  value,
  innerLabel,
  changeValue
}: SelectElementProps) => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFilter = (value: string) => {
    if (value) {
      const url = updateSearchParams(name, value);
      router.push(url);
    } else {
      const url = deleteSearchParams(name);
      router.push(url)
    }
  };

  const getLabel = (
    (multiple && value?.length >= 1) ?
      value?.map((item: OptionsProps) => item?.label) : 
      options ? 
        options?.find(x => x?.value == value)?.label : 
        null
  );

  const handleClick = () => { 
    if (!disabled) {
      setOpen(!open); 
      // setIsFocused(true)
    }
  }

  const handleMultiple = (selected: OptionsProps) => {
    if (value?.some((data: OptionsProps) => data?.value == selected?.value)) {
      let newSelected = value?.filter((item: OptionsProps) => item?.value != selected?.value);
      // @ts-ignore
      changeValue([...newSelected]);
    } else {
      // @ts-ignore
      changeValue([...value, selected])
    }
  }

  const handleSingle = (selectedValue: string) => {
    changeValue && changeValue(selectedValue);
    forFilter && handleFilter(selectedValue);
    setOpen(false);
    setInputValue('');
  }

  const handleSelect = (selected: OptionsProps) => {
    if (multiple) {
      handleMultiple(selected);
    } else if (selected?.value?.toString()?.toLowerCase() !== value?.toString()?.toLowerCase()) {
      handleSingle(selected?.value);
    } else {
      null;
    }
  }

  return (
    <OutsideClicker 
      func={() => setOpen(false)}
      clickerStyle={`!w-fit ${clickerStyle}`}
    >
      <section className={`relative w-full flex flex-col ${containerStyle}`}>
        {
          label &&
          <label className={`text-o-text-medium2 mb-[4px] text-f14 font-[500] ${labelStyle}`}>
            {label}
            {
              !required &&
              <span>{' (optional)'}</span>
            }
          </label>
        }

        <div 
          onClick={handleClick}
          className={`flex items-center justify-between w-full 
          ${medium ? 'py-[8px] px-[10px]' : small ? 'py-[6px] px-[8px]' : 'py-[12px] px-[14px]'} 
          rounded-[6px] border gap-[8px] ${disabled ? 'bg-o-bg-disabled' : 'bg-white'} 
          ${isFocused ? 'input-focus' : invalid ? 'input-error' : 'border-o-border'}
          ${fieldStyle}`}
        >
          {leftIcon}

          <div
            className={`text-f14 w-full whitespace-nowrap overflow-x-auto border-none flex items-center
            ${disabled ? 'text-o-text-disabled' : 'text-o-text-dark2'} capitalize outline-none bg-transparent`}
          >
            {
              innerLabel &&
              <div className='text-[#B3B7C2] text-f14'>
                {innerLabel}&#160;
              </div>
            }

            {
              disabledValue ? 
                disabledValue :
                getLabel ?
                  getLabel?.toString()?.replace(/,/g, ', ') :
                  <span className='text-o-text-muted'>
                    {placeholder}
                  </span>
            }
          </div>

          {
            rightIcon ||
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`min-w-[20px] transition-all ${open && 'rotate-180'}`}
            >
              <path 
                d="M5 7.5L10 12.5L15 7.5" 
                stroke="#818898" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill='transparent'
              />
            </svg>
          }
        </div>

        {
          hint &&
          <div className={`text-f12 flex items-center mt-[6px] gap-[4px]  ${
            invalid ? 'text-[#DF1C41]' :
              disabled ? 'text-o-text-disabled' :
              'text-o-text-medium3'
          }`}>
            {
              invalid &&
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M1.83337 7.99999C1.83337 4.59424 4.59429 1.83333 8.00004 1.83333C11.4058 1.83333 14.1667 4.59424 14.1667 8C14.1667 11.4058 11.4058 14.1667 8.00004 14.1667C4.59428 14.1667 1.83337 11.4057 1.83337 7.99999Z" 
                  fill="#FFF0F3"
                />
                <path 
                  d="M8.00004 8.66666L8.00004 5.16666M1.83337 7.99999C1.83337 4.59424 4.59429 1.83333 8.00004 1.83333C11.4058 1.83333 14.1667 4.59424 14.1667 8C14.1667 11.4058 11.4058 14.1667 8.00004 14.1667C4.59428 14.1667 1.83337 11.4057 1.83337 7.99999Z" 
                  stroke="#DF1C41" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill='transparent'
                />
                <path 
                  d="M7.99996 11.25C8.32213 11.25 8.58329 10.9888 8.58329 10.6667C8.58329 10.3445 8.32213 10.0833 7.99996 10.0833C7.67779 10.0833 7.41663 10.3445 7.41663 10.6667C7.41663 10.9888 7.67779 11.25 7.99996 11.25Z" 
                  fill="#DF1C41" 
                  stroke="#DF1C41" 
                  strokeWidth="0.5"
                />
              </svg>
            }
            {hint}
          </div>
        }

        <ul
          className={`bg-white shadow-md rounded-[8px] border-o-border block
          z-[60] absolute w-full min-w-fit mt-1 overflow-y-auto 
          ${ open ? `max-h-60 px-2 pb-2 ${removeSearch && 'pt-2'} border` : 'max-h-0 pb-0 px-0 border-0' }
          ${optionStyle}`}
        >
          {
            !removeSearch &&
            <div className="flex items-center px-2 sticky top-0 bg-white border-b border-[#ECECEC]">
              <AiOutlineSearch size={17} className="text-o-text-medium" />
              <input
                type="text"
                value={inputValue}
                autoFocus={true}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder={searchPlaceholder || 'Search...'}
                className={'text-o-text-dark placeholder:text-o-text-medium w-full text-f15 py-2 px-2 outline-none'}
              />
            </div>
          }

          { 
            loading ?
              <div className="flex justify-center p-3 items-center h-full w-full">
                <Loader />
              </div>
              :
              (options && options?.length > 0) ? 
                options?.map((item, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer px-3 py-2 my-[2px] truncate rounded-md text-f14 text-o-text-dark hover:bg-o-bg2
                    flex-row items-center justify-between capitalize gap-[12px] ${
                      (
                        (Array.isArray(value) && value?.some((data: OptionsProps) => data?.value == item?.value)) ||
                        item?.value?.toString()?.toLowerCase() === value?.toString()?.toLowerCase()
                      ) &&
                      'bg-o-bg2'
                    }
                    ${
                      item?.label?.toLowerCase()?.includes(inputValue)
                        ? 'flex'
                        : 'hidden'
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    <div className='flex w-full items-center gap-[12px]'>
                      {item?.icon}
                      <span className='capitalize'>
                        {item?.label}
                      </span>
                    </div>

                    {
                      multiple && (
                        (Array.isArray(value) && value?.some((data: OptionsProps) => data?.value == item?.value)) ?
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" fill="#459572"/>
                            <path d="M8.28033 11.7756C7.98744 11.4827 7.51256 11.4827 7.21967 11.7756C6.92678 12.0685 6.92678 12.5434 7.21967 12.8363L9.94202 15.5586C10.2349 15.8515 10.7098 15.8515 11.0027 15.5586L17.447 9.11431C17.7399 8.82142 17.7399 8.34655 17.447 8.05365C17.1541 7.76076 16.6792 7.76076 16.3863 8.05365L10.4724 13.9676L8.28033 11.7756Z" fill="white"/>
                          </svg>
                          :
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 7C3.5 5.067 5.067 3.5 7 3.5H17C18.933 3.5 20.5 5.067 20.5 7V17C20.5 18.933 18.933 20.5 17 20.5H7C5.067 20.5 3.5 18.933 3.5 17V7Z" stroke="#E6E7EB" fill='transparent'/>
                          </svg>
                      )
                    }
                    
                  </li>
                )) 
                : 
                <div className="flex flex-col whitespace-nowrap justify-center text-f13 gap-3 text-o-text-dark p-3 items-center h-full w-full">
                  {
                    emptyState || `No ${ name?.replace(/_/g, ' ') || 'data' } at the moment` 
                  }

                  {
                    btnTitle &&
                    <LinkButton 
                      title={btnTitle || ''}
                      path={btnPath || '#'}
                      small
                    />
                  }
                </div>
          }
        </ul>
      </section>
    </OutsideClicker>
  )
}

export default SelectElement