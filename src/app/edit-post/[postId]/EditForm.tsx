// src/app/edit-post/[postId]/EditForm.tsx
'use client';

import React, { useEffect, useState } from "react";
import { FetchedPost, getPost } from "@/lib/data";
import { useRouter } from "next/navigation";
import { updatePost } from "../../../../server-actions/posts";

interface EditFormProps {
    postId: string;
}

export default function EditForm({ postId }: EditFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const post: FetchedPost | null = await getPost(postId);
            if (post) {
                setTitle(post.title);
                setContent(post.content);
            }
            setLoading(false);
        }
        fetchPost();
    }, [postId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatusMessage("Updating...");
        const result = await updatePost(postId, title, content);

        if (result.success) {
            setStatusMessage('Post updated successfully!');
            router.push(`/posts/${postId}`);
        } else {
            setStatusMessage('Error updating post.');
        }
    }

    if (loading) {
        return <main>Loading...</main>;
    }

    return (
        <main>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
                    Save Changes
                </button>
            </form>
            {statusMessage && <p style={{ marginTop: '10px' }}>{statusMessage}</p>}
        </main>
    );
}