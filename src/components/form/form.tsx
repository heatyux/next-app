import { toast } from 'sonner'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'
import { ActionState } from '@/components/form/utils/to-action-state'

type FormProps = {
  actionState: ActionState
  action: (formData: FormData) => void
  children: React.ReactNode
}

export const Form: React.FC<FormProps> = ({
  actionState,
  action,
  children,
}) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message)
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message)
      }
    },
  })

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}
