import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ticket } from '../types'
import { ticketPath } from '@/paths'
import { TICKET_ICONS } from '../constants'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { LucideArrowUpRightFromSquare } from 'lucide-react'

type TicketProps = {
  ticket: Ticket
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail }: TicketProps) => {
  const detailButton = (
    <Button variant={'outline'} size={'icon'} asChild>
      <Link href={ticketPath(ticket.id)}>
        <LucideArrowUpRightFromSquare className="h-4 w-4" />
      </Link>
    </Button>
  )

  return (
    <div
      className={clsx('flex w-full gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  )
}

export { TicketItem }
