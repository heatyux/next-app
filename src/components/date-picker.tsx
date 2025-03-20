'use client'

import { format } from 'date-fns'
import { LucideCalendar } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerProps = {
  id: string
  name: string
  defaultValue?: string
}

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  )

  const formmatedStringDate = date ? format(date, 'yyyy-MM-dd') : ''

  return (
    <Popover>
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
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
