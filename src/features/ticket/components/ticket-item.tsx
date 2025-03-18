'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ticketPath } from '@/paths'
import { TICKET_ICONS } from '../constants'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { LucideArrowUpRightFromSquare, LucideTrash } from 'lucide-react'
import type { Ticket } from '@prisma/client'
import { deleteTicket } from '../actions/delete-ticket'

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

  const handlerDeleteTicket = async () => {
    await deleteTicket(ticket.id)
  }

  const deleteButton = (
    <Button variant="outline" size="icon" onClick={handlerDeleteTicket}>
      <LucideTrash className="h-4 w-4" />
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

      <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  )
}

export { TicketItem }
