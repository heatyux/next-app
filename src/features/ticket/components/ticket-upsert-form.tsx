'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertTicket } from '../actions/upsert-ticket'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import type { Ticket } from '@prisma/client'
import { FieldError } from '@/components/form/field-erros'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'

type TicketUpsertFormProps = {
  ticket?: Ticket
}

const TicketUpsertForm: React.FC<TicketUpsertFormProps> = ({ ticket }) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  )

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      console.log(actionState.message)
      // TODO optionally handle success
    },
    onError: ({ actionState }) => {
      console.log(actionState.message)
      // TODO optionally handle error
    },
  })

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        defaultValue={
          (actionState?.payload?.get('title') as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState?.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </form>
  )
}

export { TicketUpsertForm }
