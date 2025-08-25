import { waitSome } from "@/components/SlowComponent"
import CommentItem from "./CommentItem";
import { Comment } from "@/types";

const CommentList = async () => {
    await waitSome(1000);
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const comments = await response.json();

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
        }}>
            {comments.map((comment: Comment) => <CommentItem comment={comment} key={comment.id}/>)}
        </div>
    )
}

export default CommentList;