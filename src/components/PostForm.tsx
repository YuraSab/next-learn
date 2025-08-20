// src/components/PostForm.tsx
'use client';

import { createPost, ErrorResult, PostIdSuccessResult, SimpleSuccessResult, updatePost } from "@/actions/posts";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    initialProps?: Post;
}

export default function PostForm({ initialProps }: Props) {
    const isEditMode = !!initialProps;
    const router = useRouter();

    const [title, setTitle] = useState(initialProps?.title || "");
    const [content, setContent] = useState(initialProps?.content || "");
    const [statusMessage, setStatusMessage] = useState("");
    const [errors, setErrors] = useState({ title: "", content: "" });

    const validateForm = () => {
        const newErrors = { title: "", content: "" };
        let isValid = true;

        if (!title.trim()) {
            newErrors.title = "Title can't be empty.";
            isValid = false;
        }
        if (!content.trim()) {
            newErrors.content = "Content can't be empty.";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Викликаємо функцію валідації
        if (!validateForm())
            return;

        setStatusMessage("Sending...");

        try {
            if ( isEditMode ) {
                const result = await updatePost(initialProps.id, title, content);
                if ( result.success ) {
                    setStatusMessage("Successfully updated post");
                    router.push(`/posts/${initialProps.id}`);
                } else
                    setStatusMessage(`Error: ${result.error}`);
            } else {
                const result = await createPost(title, content);
                if ( result.success ) {
                    setStatusMessage("Successfully created post");
                    router.push(`/posts/${result.id}`);
                } else
                    setStatusMessage(`Error: ${result.error}`);
            }
        } catch {
            console.error("An unexpected error occured.")
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {isEditMode ? "Edit Post" : "Create New Post"}
            </h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errors.title && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }}>{errors.title}</p>}
            </div>
            <div>
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required
                    style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errors.content && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }}>{errors.content}</p>}
            </div>
            <button
                type="submit"
                style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                {isEditMode ? "Save Changes" : "Create Post"}
            </button>
            {statusMessage && <p style={{ marginTop: '10px', fontSize: '0.875rem' }}>{statusMessage}</p>}
        </form>
    );
}