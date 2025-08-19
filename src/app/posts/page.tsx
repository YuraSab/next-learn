import Link from "next/link";
import { Post } from "@/lib/posts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getData() {
    // const res = await fetch('http://localhost:3000/api/posts');
    const res = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });

    if (!res.ok) {
        // Обробка помилок
        throw new Error('Failed to fetch data');
    }
    
    return res.json();
}

export default async function PostsPage() {
    const posts: Post[] = await getData();
    
    return (
    <main>
      <h1>All Posts</h1>
      <section>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <h2>
                {/* Тут ми будемо посилатися на сторінку окремого поста */}
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p>{post.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}