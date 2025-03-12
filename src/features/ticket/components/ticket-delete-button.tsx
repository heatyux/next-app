'use client'

import type { Ticket } from "@prisma/client"
import { cloneElement } from "react"
import { deleteTicket } from "../actions/delete-ticket"

type CloneElementProps = {
  onClick: () => void
}

type TicketDeteleButtonProps = {
  ticket: Ticket;
  trigger: React.ReactElement<CloneElementProps>
}

const TicketDeleteButton = ({ ticket, trigger }: TicketDeteleButtonProps) => {
  const hendleDeleteTicket = async () => {
    await deleteTicket(ticket.id)
  }

  return cloneElement(trigger, {
    onClick: hendleDeleteTicket
  })
}

export { TicketDeleteButton }