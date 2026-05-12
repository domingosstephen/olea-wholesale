'use client'

import type { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label: string
  error?: FieldError
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block font-label text-label-md text-on-surface-variant">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-label-sm text-error">{error.message}</p>
      )}
    </div>
  )
}
