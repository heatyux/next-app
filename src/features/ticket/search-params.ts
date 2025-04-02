import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  sort: parseAsString.withDefault('newest'),
})

export type ParseSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
