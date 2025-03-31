import { notFound } from 'next/navigation'
import { CardCompact } from '@/components/card-compact'
import { getAuth } from '@/features/auth/queries/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getTicket } from '@/features/ticket/queries/get-ticket'

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>
}

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { user } = await getAuth()
  const ticketId = (await params).ticketId
  const ticket = await getTicket(ticketId)

  const isTicketFound = !!ticket
  const isTicketOwner = isOwner(user, ticket)

  if (!isTicketFound || !isTicketOwner) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        className="animate-fade-from-top w-full max-w-[420px]"
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  )
}
