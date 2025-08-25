import { Comment } from "@/types";

interface Props {
    comment: Comment
}

export default function CommentItem({ comment }: Props) {

    return (
        <div style={{ height: 400, border: "1px black solid", padding: "16px", margin: 40 }}>
            <h2  style={{ fontSize: 20, lineHeight: "24px", padding: 0, margin: 0 }}>{comment.name}</h2>
            <p style={{ fontStyle: "italic", fontSize: 14, marginBottom: "8px", borderRadius: "4px"}}>{comment.body}</p>
            <p style={{ fontStyle: "italic", fontSize: 12}}>{comment.email}</p>
        </div>
    )
}