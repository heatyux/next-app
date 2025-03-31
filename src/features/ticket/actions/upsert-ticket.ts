'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { setCookieByKey } from '@/actions/cookies'
import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { toCent } from '@/utils/currency'

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
})

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect()

  if (id) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    })

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized')
    }
  }

  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    })

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
      userId: user.id,
    }

    await prisma.ticket.upsert({
      where: { id: id || '' },
      create: dbData,
      update: dbData,
    })
  } catch (error) {
    return formErrorToActionState(error, formData)
  }

  revalidatePath(ticketsPath())

  if (id) {
    await setCookieByKey('toast', 'Ticket updated')
    redirect(ticketPath(id))
  }

  return toActionState('SUCCESS', 'Ticket created')
}
