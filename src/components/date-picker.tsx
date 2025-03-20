'use client'

import { format } from 'date-fns'
import { LucideCalendar } from 'lucide-react'
import { useImperativeHandle, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type ImperativeHandleFromDatePicker = {
  reset: () => void
}

type DatePickerProps = {
  id: string
  name: string
  defaultValue?: string
  imperativeHandleRef?: React.Ref<ImperativeHandleFromDatePicker>
}

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )

  const [open, setOpen] = useState(false)

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date())
    },
  }))

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
  }

  const formmatedStringDate = date ? format(date, 'yyyy-MM-dd') : ''

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formmatedStringDate}
          <input type="hidden" name={name} value={formmatedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
