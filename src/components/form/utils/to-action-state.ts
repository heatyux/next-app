import { ZodError } from 'zod'

export type ActionState = {
  message: string
}

export const formErrorToActionState = (error: unknown): ActionState => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message
    }
    // if aother error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message
    }
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      message: 'Something went wrong'
    }
  }
}