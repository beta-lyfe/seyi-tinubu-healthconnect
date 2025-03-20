import React from 'react'
import { Button } from './shad/ui/button'

export type IykeFormType = {
  labelName?: string
  inputType: 'text' | 'password' | 'tel' | 'email' | 'number'
  name?: string
  value?: string
  id?: string
  placeholder?: string
  textArea?: boolean
}

const IykeForm = ({ data }: { data: IykeFormType[] }) => {
  
  return (
    <div className="pr-4 pb-3">
      <form className="flex flex-col py-6 pl-6 gap-4 justify-center item-center">
        {data &&
          data.map((item, index) => (
            <IykeFormField
              key={index}
              name={item.name}
              placeholder={item.placeholder}
              value={item.value}
              inputType={item.inputType}
              labelName={item.labelName}
            />
          ))}
        <div className="flex items-center justify-center">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export const IykeFormField = ({
  name,
  labelName,
  inputType,
  id,
  placeholder,
  value
}: IykeFormType) => (
  <>
    <label htmlFor={labelName} className="capitalize">
      {labelName || name}
    </label>
    <input
      className="p-4 text-[#817f7f] "
      type={inputType}
      id={id}
      name={name}
      placeholder={placeholder || 'Input into these fields'}
      value={value}
    />
  </>
)

export default IykeForm
