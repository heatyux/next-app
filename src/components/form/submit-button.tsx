'use client'

import clsx from 'clsx'
import { LucideLoaderCircle } from 'lucide-react'
import { cloneElement } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
  label?: string
  icon?: React.ReactElement<{ className?: string }>
  variont?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const SubmitButton = ({
  label,
  icon,
  variont = 'default',
  size = 'default',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant={variont} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx('h-4 w-4 animate-spin', {
            'mr-2': !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span
          className={clsx({
            'ml-2': !!label,
          })}
        >
          {cloneElement(icon, {
            className: 'w-4 h-4',
          })}
        </span>
      ) : null}
    </Button>
  )
}

export { SubmitButton }
