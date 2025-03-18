import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateTicket } from '../actions/update-ticket'
import type { Ticket } from '@prisma/client'

type TicketUpdateFormProps = {
  ticket: Ticket
}

const TicketUpdateForm: React.FC<TicketUpdateFormProps> = ({ ticket }) => {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  )
}

export { TicketUpdateForm }
