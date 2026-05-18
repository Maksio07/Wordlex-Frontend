'use server'
 
import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
 
export async function updateUserID(user_id) {
  revalidateTag('user_id')
  permanentRedirect(`/profile/${user_id}`)
}