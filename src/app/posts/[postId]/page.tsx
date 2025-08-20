

import { Metadata } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { DeletePostButton } from "@/components/DeletePostButton";
import Link from "next/link";
import { getPost } from "@/actions/posts";

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
    const response = await getPost(params.postId);
  
    if (!response.success)
        return { title: 'Post Not Found' };

    return {
        title: response.post.title,
        description: `Read about ${response.post.title}`,
    };
}

export default async function PostDetail({ params }: Props) {
    const response = await getPost(params.postId);

    if (!response.success)
        return <div>Post not found!</div>;
    
    return (
      <main>
        <h1>{response.post.title}</h1>
        <p>Published on: {new Date(response.post.createdAt).toLocaleDateString()}</p>
        <hr />
        <article>{response.post.content}</article>
        <Link href={`/edit-post/${response.post.id}`}>
            <button style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none' }}>
                Edit Post
            </button>
        </Link>
        <DeletePostButton postId={response.post.id}/>
      </main>
    );
}