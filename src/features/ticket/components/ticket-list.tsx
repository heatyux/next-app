import { Placeholder } from '@/components/placeholder'
import { SearchInput } from '@/components/search-input'
import { SortSelect } from '@/components/sort-select'
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
      <div className="flex w-full max-w-[420px] gap-x-2">
        <SearchInput placeholder="Search tickets ..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: 'Newest', value: 'newest' },
            { label: 'Bounty', value: 'bounty' },
          ]}
        />
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
