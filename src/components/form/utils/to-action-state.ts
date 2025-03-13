import { ZodError } from 'zod'

export type ActionState = {
  state: 'IDLE' | 'SUCCESS' | 'ERROR',
  message: string,
  playload?: FormData,
  fieldErrors: Record<string, string[] | undefined>,
  timestamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
  state: 'IDLE',
  message: '',
  fieldErrors: {},
  timestamp: Date.now()
}

export const formErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      state: 'ERROR',
      message: error.errors[0].message,
      playload: formData,
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now()
    }
    // if aother error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      state: 'ERROR',
      message: error.message,
      playload: formData,
      fieldErrors: {},
      timestamp: Date.now()
    }
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      state: 'IDLE',
      message: 'An unknown error occurred',
      playload: formData,
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