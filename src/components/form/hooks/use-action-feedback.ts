import { useEffect } from 'react'
import { ActionState } from '../utils/to-action-state'

type OnArgs = {
  actionState: ActionState
}

type UseActionFeedBackOptions = {
  onSuccess?: (onArgs: OnArgs) => void
  onError?: (onArgs: OnArgs) => void
}

export const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedBackOptions,
) => {
  useEffect(() => {
    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState })
    }
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState })
    }
  }, [actionState, options])
}
