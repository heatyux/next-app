import Link from "next/link"
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ticketPath } from "@/path"
import type { Ticket } from "../types";
import { TICKET_ICONS } from "../constants";
import { Button } from "@/components/ui/button";
import { LucideArrowUpRightFromSquare } from "lucide-react";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button variant='outline' size='icon' asChild>
      <Link href={ticketPath(ticket.id)} className="underline">
        <LucideArrowUpRightFromSquare className="w-4 h-4" />
      </Link>
    </Button>
  )

  return (
    <div
      className={clsx('w-full flex flex-1 gap-x-1', {
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

      {
        isDetail ? null : (
          <div className="flex flex-col gap-y-1">{detailButton}</div>
        )
      }
    </div>
  )
}

export { TicketItem}