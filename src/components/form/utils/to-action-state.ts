import { ZodError } from 'zod'

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR'
  message: string
  payload?: FormData
  fieldErrors: Record<string, string[] | undefined>
  timeStamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timeStamp: Date.now(),
}

export const formErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    // if validation error with Zod, return first error message
    return {
      status: 'ERROR',
      message: '',
      payload: formData,
      fieldErrors: error.flatten().fieldErrors,
      timeStamp: Date.now(),
    }
  } else if (error instanceof Error) {
    // if another error instance, return error message
    return {
      status: 'ERROR',
      message: error.message,
      payload: formData,
      fieldErrors: {},
      timeStamp: Date.now(),
    }
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      status: 'ERROR',
      message: 'An unknown error occurred',
      fieldErrors: {},
      payload: formData,
      timeStamp: Date.now(),
    }
  }
}

export const toActionState = (
  status: ActionState['status'],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timeStamp: Date.now(),
  }
}
