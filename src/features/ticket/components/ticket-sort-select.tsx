'use client'

import { useQueryStates } from 'nuqs'
import { SortSelect, SortSelectOption } from '@/components/sort-select'
import { sortOptions, sortParser } from '@/features/ticket/search-params'

type TicketSortSelect = {
  options: SortSelectOption[]
}

const TicketSortSelect = ({ options }: TicketSortSelect) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions)

  return <SortSelect value={sort} onChange={setSort} options={options} />
}

export { TicketSortSelect }
