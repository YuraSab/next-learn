// src/components/DeletePostButton.tsx
'use client';

import { useRouter } from "next/navigation"; // Correct import for App Router
import { deletePost } from "../../server-actions/posts";

export const DeletePostButton = ({ postId }: { postId: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deletePost(postId)
            if (result.success) {
                alert("Post deleted successfully!");
                router.push("/posts");
              } else {
                alert("Error deleting post.");
              }
        } catch(error) {
            alert("An unexpected error occurred.");
        }
    }

    return (
        <button onClick={handleDelete} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none' }}>
            Delete Post
        </button>
    )
}