'use client'

import { useQueryStates } from 'nuqs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortOptions, sortParser } from '@/features/ticket/search-params'

type Option = {
  sortKey: string
  sortValue: string
  label: string
}

type SortSelectProps = {
  options: Option[]
}

const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions)

  const handleSelectChange = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split('_')

    setSort({
      sortKey,
      sortValue,
    })
  }

  return (
    <Select
      defaultValue={sort.sortKey + '_' + sort.sortValue}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + '_' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
