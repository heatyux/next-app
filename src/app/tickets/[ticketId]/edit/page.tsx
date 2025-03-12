import { notFound } from "next/navigation"
import { CardCompact } from "@/components/card-compact"
import { TicketUpdateForm } from "@/features/ticket/components/ticket-update-form"
import { getTicket } from "@/features/ticket/queries/get-ticket"

type TicketEditPageProps = {
  params: Promise<{ ticketId: string}>
}

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const ticketId = (await params).ticketId
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col jusctify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<TicketUpdateForm ticket={ticket} />}
      />
    </div>
  )
}

export default TicketEditPage