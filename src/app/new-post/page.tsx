'use client'; // Позначає, що це клієнтський компонент

import { useRouter } from "next/navigation";
import { useState } from "react"
import { createPost } from "../../../server-actions/posts";
 
export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const router = useRouter();



    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setStatusMessage('Creating post...');
        // Викликаємо Server Action
        const result = await createPost(title, content);


        if (result.success) {
            setStatusMessage('Post created successfully!');
            // Очищаємо форму
            setTitle('');
            setContent('');
            
            // Перенаправляємо на сторінку з постами
            router.push('/posts');
          } else {
            setStatusMessage('Error creating post.');
          }
    }

    return (
        <main>
          <h1>Create a New Post</h1>
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
              Create Post
            </button>
          </form>
          {statusMessage && <p style={{ marginTop: '10px' }}>{statusMessage}</p>}
        </main>
    );
}