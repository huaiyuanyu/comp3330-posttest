import Image from 'next/image'

import { db } from '@/db'
import {posts as postsTable } from '@/db/schema/posts'

export default async function Home() {

  const posts = await db.select().from(postsTable)

  return (
    <main>
      {posts.map(post => <p key={post.id}>{post.content}</p>)}
    </main>
  )
}
