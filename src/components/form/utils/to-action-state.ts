import { ZodError } from 'zod'

export type ActionState = {
  state: 'IDLE' | 'SUCCESS' | 'ERROR',
  message: string,
  fieldErrors: Record<string, string[] | undefined>,
  timestamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
  state: 'IDLE',
  message: '',
  fieldErrors: {},
  timestamp: Date.now()
}

export const formErrorToActionState = (error: unknown): ActionState => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      state: 'ERROR',
      message: error.errors[0].message,
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now()
    }
    // if aother error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      state: 'ERROR',
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now()
    }
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      state: 'IDLE',
      message: 'An unknown error occurred',
      fieldErrors: {},
      timestamp: Date.now()
    }
  }
}

export const toActionState = (
  state: ActionState['state'],
  message: string
): ActionState => {
  return {
    state,
    message,
    fieldErrors: {},
    timestamp: Date.now()
  }
}