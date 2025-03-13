'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/path'

export const upsertTicket = async (id: string | undefined, formData: FormData) => {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  }

  const dbData = {
    title: data.title as string,
    content: data.content as string
  }

  await prisma.ticket.upsert({
    where: {
      id: id || ''
    },
    create: dbData,
    update: dbData
  })

  revalidatePath(ticketsPath())
  
  if(id) {
    redirect(ticketPath(id))
  }
}