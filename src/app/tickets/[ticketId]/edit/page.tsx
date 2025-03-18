import { notFound } from 'next/navigation'
import { CardCompact } from '@/components/card-compact'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { TicketUpdateForm } from '@/features/ticket/components/ticket-update-form'

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>
}

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const ticketId = (await params).ticketId
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        className="animate-fade-from-top w-full max-w-[420px]"
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpdateForm ticket={ticket} />}
      />
    </div>
  )
}
