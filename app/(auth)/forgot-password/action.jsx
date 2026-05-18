'use server'
 
import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
 
export async function updateURL(url) {
  revalidateTag('url')
  permanentRedirect(`/reset-password/${url}`)
}