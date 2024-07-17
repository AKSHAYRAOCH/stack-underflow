import { auth } from "@/auth"
import db from "@/db/drizzle"
import {Posts} from "@/db/schema"



async function HandlePost(formdata: FormData){
    "use server"
    const session = await auth();
    const userid = session?.user?.id
    
    
    const result = await db.insert(Posts).values({postContent:String(formdata.get("mesage")),postOwnerId:userid}).returning()
    console.log(result)
}


export default async function CreatePost() {
    "use server"



    return (
      <div>
        <h1>Create a post</h1>
        <form method="POST" action={HandlePost}>
          
  
          
          <div>
            <label>Message</label>
            <textarea name="message" />
          </div>
  
          <button type="submit">Send message</button>
        </form>
      </div>
    )
  }