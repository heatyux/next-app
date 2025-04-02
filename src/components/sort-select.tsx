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

  const handleSelectChange = (value: string) => {
    const sortValue = options.find(
      (option) => option.sortKey === value,
    )?.sortValue

    setSort({
      sortKey: value,
      sortValue,
    })
  }

  return (
    <Select defaultValue={sort.sortKey} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.sortKey} value={option.sortKey}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
