'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/path'

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024)
})

export const upsertTicket = async (id: string | undefined, formData: FormData) => {
  const data = upsertTicketSchema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  await prisma.ticket.upsert({
    where: {
      id: id || ''
    },
    create: data,
    update: data
  })

  revalidatePath(ticketsPath())
  
  if(id) {
    redirect(ticketPath(id))
  }
}