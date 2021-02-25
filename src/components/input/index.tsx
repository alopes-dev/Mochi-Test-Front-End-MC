import React, { InputHTMLAttributes } from 'react'

import { Label } from '@components/input/styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string
  type?: string
  color?: string
  placeholder?: string
  icon?: React.ReactNode | React.Component
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  color = '#7159c1',
  icon,
  ...rest
}) => {
  return (
    <Label htmlFor={name} color={color} icon={icon}>
      <input name={name} type={type} aria-label={name} {...rest} />
      {icon && icon}
    </Label>
  )
}
