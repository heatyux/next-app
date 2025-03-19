'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/form/submit-button'
import type { Ticket } from '@prisma/client'
import { FieldError } from '@/components/form/field-erros'
import { useActionState } from 'react'
import { upsertTicket } from '../actions/upsert-ticket'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Form } from '@/components/form/form'

type TicketUpsertFormProps = {
  ticket?: Ticket
}

const TicketUpsertForm: React.FC<TicketUpsertFormProps> = ({ ticket }) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  )

  return (
    <Form actionState={actionState} action={action}>
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
    </Form>
  )
}

export { TicketUpsertForm }
