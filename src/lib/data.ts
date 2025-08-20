import { doc, getDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export type Post = {
    title: string;
    createdAt: ReturnType<typeof serverTimestamp>;
    content: string;
};

export type FetchedPost = Post & { id: string };

export async function getPost(postId: string) {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }
    return {
        id: docSnap.id,
        ...docSnap.data() as Post,
    };
}