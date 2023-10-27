"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"

export async function createPost(content: string) {
  console.log(content)

  if (!content || content.length < 3) {
    return { error: "not enough content" }
  }

  try {
    await db.insert(postsTable).values({
      content,
      userId: "1",
    })
  } catch (error) {
    console.error(error)
    return { error: "something went wrong" }
  }
  
  revalidatePath("/")
  redirect(`/`)
}
