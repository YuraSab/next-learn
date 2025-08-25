'use client'
import { useEffect, useState } from "react"
import CommentItem from "./CommentItem";
import CommentItemSceletor from "./CommentItemSceleton";
import { Comment } from "@/types";


export default function SceletonList() {
const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        function getComments() {
            setTimeout( async() => {
                const response = await fetch("https://jsonplaceholder.typicode.com/comments");
                const data = await response.json();
                setComments(data);
            }, 1000);
        }
        getComments();
    }, []);

    return (
        <main>
            {
                comments.length > 0 ? 
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 20,
                }}>
                    {
                        comments
                            .map((comment) => <CommentItem comment={comment} key={comment.id}/> )
                    }
                </div>

                : 
                
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 20,
                }}>
                    {
                        Array
                            .from({ length: 12 })
                            .map((_, id) => <CommentItemSceletor key={id}/> )
                    }
                </div>
            }
        
        </main>
    )
}