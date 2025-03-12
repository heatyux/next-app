import type { Ticket } from "@prisma/client"
import { deleteTicket } from "../actions/delete-ticket"

type TicketDeteleButtonProps = {
  ticket: Ticket;
  trigger: React.ReactElement
}

const TicketDeleteButton = ({ ticket, trigger }: TicketDeteleButtonProps) => {

  return (
    <form action={deleteTicket.bind(null, ticket.id)}>
      {trigger}
    </form>
  )
}

export { TicketDeleteButton }