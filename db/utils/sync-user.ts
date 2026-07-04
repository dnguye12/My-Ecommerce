import { currentUser } from '@clerk/nextjs/server'
import { db } from '..'
import { users } from '../schema'

export const syncUser = async () => {
  const thisUser = await currentUser()

  if (thisUser != null) {
    const email = thisUser.primaryEmailAddress?.emailAddress ?? ''

    await db
      .insert(users)
      .values({
        id: thisUser.id,
        email
      })
      .onConflictDoNothing({ target: users.id })

    return thisUser.id
  }
}
