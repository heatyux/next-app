import { Placeholder } from '@/components/placeholder'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'

type TicketPageProps = {
  params: Promise<{ ticketId: string }>
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticketId = (await params).ticketId
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    return <Placeholder label='Ticket not found' />
  }

  return (
    <div className='flex justify-center animate-fade-in-from-top'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}

export default TicketPage