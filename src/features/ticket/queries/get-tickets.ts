import { prisma } from '@/lib/prisma'
import { ParseSearchParams } from '../search-params'

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParseSearchParams,
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      ...(searchParams.sort === 'newest' && {
        createdAt: 'desc',
      }),
      ...(searchParams.sort === 'bounty' && {
        bounty: 'desc',
      }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
