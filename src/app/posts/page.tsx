import db from "@/db/drizzle"
import { posts, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"


async function fetchData(){
    
    const data = await db.select({
        id:posts.postID,
        name: posts.postOwnerName,
        content: posts.postContent
    }).from(posts)
    console.log(data)
    revalidatePath('/posts')
    return data
}

export default async function Posts(){
    

    const data = await fetchData()
    
    return(
        <div>
            <ul>
                {data.map(post=><li key={post.id}>{post.id}  &nbsp;&nbsp;&nbsp;  {post.name}&nbsp;&nbsp;&nbsp; {post.content}</li>)}
            </ul>
        </div>
    )
}