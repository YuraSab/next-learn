// src/actions/posts.ts
'use server';

import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  orderBy,
  query,
  getDoc
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { Post } from "@/types";


// Набір результатів
// export type PostSuccessResult = {
//     success: true;
//     post: Post;
// }
// export type PostsSuccessResult = {
//     success: true;
//     posts: Post[];
// }
// export type PostIdSuccessResult = {
//     success: true;
//     id: string;
// }
// export type SimpleSuccessResult = {
//     success: true;
// };
// export type ErrorResult = {
//     success: false;
//     error: string;
// };

// // ----------------------
// // Оновлені типи для результатів
// // ----------------------
// export type GetPostPromise = Promise<PostSuccessResult | ErrorResult>;
// export type GetPostsPromise = Promise<PostsSuccessResult | ErrorResult>;
// export type CreatePostPromise = Promise<PostIdSuccessResult | ErrorResult>;
// export type PostUpdatePromise = Promise<SimpleSuccessResult | ErrorResult>;
// export type PostDeletePromise = Promise<SimpleSuccessResult | ErrorResult>;



// Типи для результатів операцій
export type PostSuccessResult = { success: true; post: Post; };
export type PostsSuccessResult = { success: true; posts: Post[]; };
export type PostIdSuccessResult = { success: true; id: string; };
export type SimpleSuccessResult = { success: true; };
export type ErrorResult = { success: false; error: string; };



// ----------------------
// 1. ОТРИМАННЯ ВСІХ ПОСТІВ (READ ALL)
// ----------------------
export async function getPosts(): Promise<PostsSuccessResult | ErrorResult> {
    try {
        const postCollection = collection(db, 'posts');
        const q = query(postCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
  
        const posts = querySnapshot.docs.map(doc => {
            const data = doc.data() as DocumentData; // Явно вказуємо тип DocumentData
            return {
                id: doc.id,
                title: data.title,
                content: data.content,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            };
        });
  
        return { success: true, posts: posts as Post[] };
    } catch (error) {
        console.error("Error getting documents: ", error);
        return { success: false, error: "Failed to get posts." };
    }
}
  
// ----------------------
// 2. ОТРИМАННЯ ОДНОГО ПОСТУ ЗА ID (READ ONE)
// ----------------------
export async function getPost(postId: string): Promise<PostSuccessResult | ErrorResult> {
    try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
  
        if (!docSnap.exists())
            return { success: false, error: "Post not found." };
  
        const data = docSnap.data() as DocumentData; // Явно вказуємо тип
        const post = {
            id: docSnap.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        };
  
        return { success: true, post: post as Post };
    } catch (error) {
        console.error("Error getting document: ", error);
        return { success: false, error: "Failed to get post." };
    }
}

// ----------------------
// 3. СТВОРЕННЯ ДАНИХ (CREATE)
// ----------------------
export async function createPost(title: string, content: string): Promise<PostIdSuccessResult | ErrorResult> {
    try {
        const postCollection = collection(db, 'posts');
        const docRef = await addDoc(postCollection, {
            title,
            content,
            createdAt: serverTimestamp(),
        });
        revalidatePath('/posts');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: "Failed to create post." };
    }
}

// ----------------------
// 4. ОНОВЛЕННЯ ДАНИХ (UPDATE)
// ----------------------
export async function updatePost(postId: string, title: string, content: string): Promise<SimpleSuccessResult | ErrorResult> {
    try {
        const postDocRef = doc(db, 'posts', postId);
        await updateDoc(postDocRef, {
            title, content
        });
        revalidatePath('/posts');
        revalidatePath(`/posts/${postId}`);
        return { success: true };
    } catch(error) {
        console.error("Error updating document: ", error);
        return { success: false, error: "Failed to update post." };
    }
}

// ----------------------
// 5. ВИДАЛЕННЯ ДАНИХ (DELETE)
// ----------------------
export async function deletePost(postId: string): Promise<SimpleSuccessResult | ErrorResult> {
    try {
        const post = doc(db, 'posts', postId);
        await deleteDoc(post);
        revalidatePath('/posts');
        return { success: true };
    } catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false, error: "Failed to delete post." };
    }
}