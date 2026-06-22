'use client'
import { Box } from '@/components/base/Box'
import { Label } from '@/components/base/Label'
import { Text } from '@/components/base/Text'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ReactNode } from 'react'

type InputProps = {
  type: 'text'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

type TextareaProps = {
  type: 'textarea'
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'>

type SelectProps = {
  type: 'select'
  options: { value: string; label: string }[]
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'type'>

type FormFieldBaseProps = {
  label?: string
  error?: string
  helperText?: string
  className?: string
}

type FormFieldProps = FormFieldBaseProps & (InputProps | TextareaProps | SelectProps)

function Input({ id, error, className = '', required, ...rest }: FormFieldBaseProps & InputProps) {
  return (
    <input
      id={id}
      name={id}
      className={`
          border-4 p-3 font-medium bg-bg border-border text-text w-full
          focus:outline-none focus:ring-4 transition-all placeholder:opacity-50
          ${error && `border-red-400!`}
          ${className}`}
      {...rest}
    />
  )
}

function Textarea({ id, error, className = '', required, ...rest }: FormFieldBaseProps & TextareaProps) {
  return (
    <textarea
      id={id}
      name={id}
      className={`
          border-4 p-3 font-medium bg-bg border-border text-text w-full
          focus:outline-none focus:ring-4 transition-all placeholder:opacity-50
          ${error && `border-red-400!`}
          ${className}`}
      {...rest}
    />
  )
}

function Select({ id, error, options, className = '', required, ...rest }: FormFieldBaseProps & SelectProps) {
  return (
    <Box className="relative w-full">
      <select
        id={id}
        name={id}
        className={`
          border-4 p-3 font-medium bg-bg border-border text-text w-full appearance-none pr-12
          focus:outline-none focus:ring-4 transition-all placeholder:opacity-50
          ${error && `border-red-400!`}
          ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 
        -translate-y-1/2 w-2.5 h-2.5 border-r-4 
        border-b-4 border-r-text border-b-text rotate-45"
      />
    </Box>
  )
}

type InputHelperText = { id?: string; children: ReactNode }

function InputErrorText({ id, children }: InputHelperText) {
  return (
    <Text id={`${id}-error`} className="text-red-400! font-bold!" size="body-sm">
      {children}
    </Text>
  )
}

function InputHelperText({ id, children }: InputHelperText) {
  return (
    <Text id={`${id}-helper`} className="text-muted!" size="body-sm">
      {children}
    </Text>
  )
}

function FormFieldInner(props: FormFieldProps) {
  const { label, error, helperText } = props

  return (
    <Box className="flex-col items-start w-full gap-2">
      {label && (
        <Label id={'id' in props ? props.id : undefined} required={'required' in props ? props.required : undefined}>
          {label}
        </Label>
      )}

      <RenderField {...props} />

      {error && <InputErrorText id={'id' in props ? props.id : undefined}>{error}</InputErrorText>}
      {helperText && !error && <InputHelperText id={'id' in props ? props.id : undefined}>{helperText}</InputHelperText>}
    </Box>
  )
}

function RenderField(props: FormFieldProps) {
  switch (props.type) {
    case 'text':
      return <Input {...props} />
    case 'textarea':
      return <Textarea {...props} />
    case 'select':
      return <Select {...props} />
  }
}

export function FormField(props: FormFieldProps) {
  return <FormFieldInner {...props} />
}
