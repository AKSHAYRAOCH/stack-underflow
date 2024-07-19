import db from "@/db/drizzle"
import { posts, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function Posts(){

    const data = await db.select({
        name:users.name,
        id:posts.postID,
        content:posts.postContent
    }).from(posts).innerJoin(users,eq(posts.postOwnerId,users.id))
    console.log(data)
    
    return(
        <div>
            <ul>
                {data.map(post=><li key={post.id}>{post.id}  &nbsp;&nbsp;&nbsp;  {post.name}&nbsp;&nbsp;&nbsp; {post.content}</li>)}
            </ul>
        </div>
    )
}