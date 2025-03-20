import { LucideCheckCircle, LucideFileText, LucidePencil } from 'lucide-react'

export const TICKET_ICONS = {
  OPEN: <LucideFileText className="h-4 w-4" />,
  IN_PROGRESS: <LucideCheckCircle className="h-4 w-4" />,
  DONE: <LucidePencil className="h-4 w-4" />,
}
