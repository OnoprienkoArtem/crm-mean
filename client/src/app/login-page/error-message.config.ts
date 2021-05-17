export interface ErrorMessages {
  type: string;
  text: string;
  param1?: string;
  param2?: string;
}

export const EMAIL_ERROR_MESSAGES: ErrorMessages[] = [
  {
    type: 'required',
    text: 'Email should not be empty.'
  },
  {
    type: 'email',
    text: 'Type correct email address.'
  }
]

export const PASSWORD_ERROR_MESSAGES: ErrorMessages[] = [
  {
    type: 'required',
    text: 'Password should not be empty.'
  },
  {
    type: 'password',
    text: 'Type correct length of password {{param1}}. Now password consists of {{param2}}',
    param1: 'password.errors.minlength.requiredLength',
    param2: 'password.errors.minlength.actualLength',
  },
]
