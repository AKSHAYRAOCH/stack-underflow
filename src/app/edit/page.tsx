import { auth } from "@/auth"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm";
import {posts} from "@/db/schema"



async function HandlePost(formdata: FormData){
    "use server"
    const session = await auth();
    const userid = session?.user?.id
    
    try{
        const postId = formdata.get("postid") as string
        const message = formdata.get("message") as string
        const result = await db.update(posts).set({postContent: message}).where(eq(posts.postID, parseInt(postId))).returning()
        
        console.log(result)
    }
    catch(err){
        console.log(err)
    }

}


export default async function EditPost() {
    "use server"

    return (

        <div>
            <h1>Edit post</h1>
            <form action={HandlePost}>
                <div>
                    <label>Post ID</label>
                    <input type="text" name="postid" required></input>
                </div>  
          
                <div>
                    <label>Message</label>
                    <textarea name="message" required />
                </div>
  
                <button type="submit">Edit message</button>
            </form>
        </div>
    )
  }
