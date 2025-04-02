'use client'

import { useQueryState } from 'nuqs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortParse } from '@/features/ticket/search-params'

type Option = {
  label: string
  value: string
}

type SortSelectProps = {
  options: Option[]
}

const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryState('sort', sortParse)

  const handleSelectChange = (value: string) => {
    setSort(value)
  }

  return (
    <Select defaultValue={sort} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
