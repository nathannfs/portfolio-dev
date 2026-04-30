import { type FormEvent, useState } from 'react'

export interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

function resetForm(form: HTMLFormElement) {
  form.reset()
}

export function useFormState(
  action: (data: FormData) => Promise<FormState | undefined>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, setIsPending] = useState(false)
  const [formState, setFormState] = useState<FormState>(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    setIsPending(true)
    try {
      const state = await action(data)

      if (state) {
        if (state.success) {
          if (onSuccess) {
            await onSuccess()
          }
          resetForm(form)
        }
        setFormState(state)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsPending(false)
    }
  }

  return [formState, handleSubmit, isPending] as const
}
