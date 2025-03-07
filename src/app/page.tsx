import Link from "next/link"
import { ticketsPath } from "@/path"

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Home</h2>
        <p className="text-sm text-muted-foreground">
          Your home place to start
        </p>
      
        <div className="flex-1 flex flex-col items-center">
          <Link href={ticketsPath()} className="underline">
            Go to Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage