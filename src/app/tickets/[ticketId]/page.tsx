import { Placeholder } from '@/components/placeholder'
import { Button } from '@/components/ui/button'
import { initialTickets } from '@/data'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { ticketsPath } from '@/paths'
import Link from 'next/link'

type TicketPageProps = {
  params: Promise<{
    ticketId: string
  }>
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId)

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={({ className }) => (
          <Button asChild variant={'outline'}>
            <Link className={className} href={ticketsPath()}>
              Go to Tickets
            </Link>
          </Button>
        )}
      />
    )
  }

  return (
    <div className="animate-fade-from-top flex justify-center">
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}

export default TicketPage
