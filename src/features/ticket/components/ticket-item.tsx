import type { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideArrowUpRightFromSquare, LucidePencil, LucideTrash } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ticketEditPath, ticketPath } from "@/path"
import { TICKET_ICONS } from "../constants";
import { TicketDeleteButton } from "./ticket-delete-button";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button variant='outline' size='icon' asChild>
      <Link prefetch href={ticketPath(ticket.id)} className="underline">
        <LucideArrowUpRightFromSquare className="w-4 h-4" />
      </Link>
    </Button>
  )

  const editButton = (
    <Button variant={'outline'} size='icon' asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil />
      </Link>
    </Button>
  )

  const deleteButton = (
    <TicketDeleteButton 
      ticket={ticket}
      trigger={
        <Button variant={'outline'} size={'icon'}>
          <LucideTrash className="w-4 h-4" />
        </Button>
      }
    />
  )

  return (
    <div
      className={clsx('w-full flex gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {deleteButton}
            {editButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  )
}

export { TicketItem}