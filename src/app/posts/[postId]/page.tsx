

// src/app/posts/[postId]/page.tsx
// НЕМАЄ "use client" тут

import { Metadata } from "next";
import { collection, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { DeletePostButton } from "@/components/DeletePostButton";
import Link from "next/link";
import { getPost, Post, FetchedPost } from '@/lib/data';


interface Props {
    params: {
        postId: string,
    }
}

export async function generateStaticParams() {
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);
    return querySnapshot.docs.map((doc) => ({ postId: doc.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post: FetchedPost | null = await getPost(params.postId);
  
    if (!post) {
      return { title: 'Post Not Found' };
    }
    return {
      title: post.title,
      description: `Read about ${post.title}`,
    };
}

export default async function PostDetail({ params }: Props) {
    const post: FetchedPost | null = await getPost(params.postId);

    if (!post) {
      return <div>Post not found!</div>;
    }
    return (
      <main>
        <h1>{post.title}</h1>
        {/* @ts-ignore */}
        <p>Published on: {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
        <hr />
        <article>{post.content}</article>
        <Link href={`/edit-post/${post.id}`}>
            <button style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none' }}>
              Edit Post
            </button>
        </Link>
        <DeletePostButton postId={post.id}/>
      </main>
    );
}