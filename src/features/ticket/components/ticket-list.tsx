import { Placeholder } from '@/components/placeholder'
import { SearchInput } from '@/components/search-input'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTickets } from '@/features/ticket/queries/get-tickets'
import { SearchParams } from '../search-params'

type TicketListProps = {
  userId?: string
  searchParams: SearchParams
}

const TicketList: React.FC<TicketListProps> = async ({
  userId,
  searchParams,
}) => {
  const tickets = await getTickets(userId, searchParams)

  return (
    <div className="animate-fade-from-top flex flex-1 flex-col items-center gap-y-4">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets ..." />
      </div>

      {tickets.length > 0 ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="Not tickets found" />
      )}
    </div>
  )
}

export { TicketList }
