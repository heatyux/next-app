'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookieByKey } from '@/actions/cookies'
import {
  formErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const deleteTicket = async (ticketId: string) => {
  const { user } = await getAuthOrRedirect()

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    })

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized')
    }

    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    })
  } catch (error) {
    formErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  await setCookieByKey('toast', 'Ticket deleted')
  redirect(ticketsPath())
}
