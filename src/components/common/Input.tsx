import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  className?: string
  wrapperClassName?: string
}

export default function Input({
  label,
  error,
  className = '',
  wrapperClassName = '',
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className={`rounded-[10px] border px-3.5 py-2.5 focus:outline-none ${
          error
            ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
            : 'focus:ring-0.8 border-gray-300 placeholder-gray-400 focus:border-gray-900 focus:placeholder-gray-900 focus:ring-gray-900'
        } read-only:cursor-not-allowed read-only:bg-gray-200 read-only:text-gray-400 read-only:placeholder-gray-400 read-only:focus:border-gray-300 focus:read-only:placeholder-gray-400 read-only:focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-300 disabled:placeholder-gray-400 disabled:focus:border-gray-300 disabled:focus:ring-0 ${className} `}
        {...props}
      />
    </div>
  )
}
