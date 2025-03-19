import { ActionState } from '@/components/form/utils/to-action-state'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'
import { toast } from 'sonner'

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
