import { auth } from "@/auth"
import db from "@/db/drizzle"
import {posts} from "@/db/schema"
import {Button} from "antd"


async function HandlePost(formdata: FormData){
    "use server"
    const session = await auth();
    const userid = session?.user?.id
    const userName = session?.user?.name
    
    
    try{
      const result = await db.insert(posts).values({postContent:formdata.get("message") as string,postOwnerId:userid, postOwnerName:userName, title: formdata.get("title") as string,}).returning()
    console.log(result)
    }
    catch(err){
      console.log(err)
    }
}


export default async function CreatePost() {
    "use server"



    return (
      <div>
        <h1>Create a post</h1>
        <form method="POST" action={HandlePost}>
          
  
        <div>
            <label>Title:</label>
            <textarea name="title" required />
          </div>

          <div>
            <label>Message:</label>
            <textarea name="message" required />
          </div>
  
      
          <Button type="primary" htmlType="submit">Send message</Button>
        </form>
      </div>
    )
  }

