import { ticketsPath } from '@/paths'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="gay-y-8 flex flex-1 flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">HomePage</h2>
        <p className="text-muted-foreground text-sm">
          Your home place to start
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  )
}

export default HomePage
