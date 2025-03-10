import { LucideLoader2 } from "lucide-react"

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 self-center flex flex-col items-center justify-center"
    >
      <LucideLoader2 className="w-16 h-16 animate-spin" />
    </div>
  )
}

export { Spinner }