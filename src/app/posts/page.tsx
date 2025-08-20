// src/app/posts/page.tsx
import { Post } from "@/types";
import Link from "next/link";
import { getPosts } from "@/actions/posts"; // Імпортуємо нашу функцію

export default async function PostsPage() {
    const response = await getPosts(); // Викликаємо Server Action

    if (!response.success) {
        return <main>Помилка: {response.error}</main>;
    }

    const posts = response.posts;
    
    return (
    <main>
      <h1>All Posts</h1>
      <section>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <h2>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              {/* Тут ми будемо використовувати дату, яку отримали */}
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}