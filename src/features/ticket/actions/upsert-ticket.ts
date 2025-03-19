'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'
import { z } from 'zod'

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
})

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string; payload?: FormData },
  formData: FormData,
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    })

    await prisma.ticket.upsert({
      where: { id: id || '' },
      create: data,
      update: data,
    })
  } catch {
    return { message: 'Something went wrong', payload: formData }
  }

  revalidatePath(ticketsPath())

  if (id) {
    redirect(ticketsPath())
  }

  return { message: 'Ticket created' }
}
