'use server'

import { revalidatePath } from 'next/cache'

export const nextRevalidatePath = async (path: string) => {
  revalidatePath(path)
}
