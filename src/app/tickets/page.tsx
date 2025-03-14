import Link from 'next/link'
import { initialTickets } from '@/data'
import { ticketPath } from '@/paths'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LucideCheckCircle, LucideFileText, LucidePencil } from 'lucide-react'
import { Heading } from '@/components/heading'

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucideCheckCircle />,
  DONE: <LucidePencil />,
}

const TicketsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <div className="animate-fade-from-top flex flex-1 flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-x-2">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="truncate">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="line-clamp-3 whitespace-break-spaces">
                {ticket.content}
              </span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TicketsPage
