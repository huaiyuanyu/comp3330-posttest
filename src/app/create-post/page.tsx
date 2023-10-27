import { db } from "@/db"
import { posts } from "@/db/schema/posts"
import {redirect} from 'next/navigation'
import { revalidatePath } from "next/cache"

import SubmitButton from "./submit-button"

export default function CreatePost() {

    async function handleCreatePost(data: FormData) {
        "use server"
        const content = data.get("content") as string
        
        const result = await db.insert(posts).values({
            content,
            userId: "1"
        }).returning()
        
        revalidatePath("/")
        redirect("/")
    }

    return (
      <main className="text-center mt-10">
        <form action={handleCreatePost} className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4">
          <label className="w-full">
            <textarea
              className="bg-transparent flex-1 border-none outline-none w-full"
              name="content"
              placeholder="Post a thing..."
              required
            />
          </label>
  
          <SubmitButton />
        </form>
      </main>
    )
  }
  