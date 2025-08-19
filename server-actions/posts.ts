// src/actions/posts.ts
'use server';

import { db } from "@/config/firebase";
import { addDoc, collection, CollectionReference, DocumentData, serverTimestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export type Post = {
    title: string;
    createdAt: ReturnType<typeof serverTimestamp>;
    content: string;
  };

// Функція, яка виконується на сервері
export async function createPost(title: string, content: string) {
    try {
        const postCollection = collection(db, 'posts') as CollectionReference<Post, DocumentData>;
        const docRef = await addDoc(postCollection, {
            title, 
            content,
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

        // Оновлює кеш для сторінки posts, щоб показати новий пост
        revalidatePath('/posts');
    
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: "Failed to create post." };
    }
}


export async function deletePost(postId: string) {
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


export async function updatePost(postId: string, title: string, content: string) {
    try {
        const postDocRef = doc(db, 'posts', postId);
        await updateDoc(postDocRef, {
            title, content
        });
        console.log("Document successfully updated!");
        revalidatePath('/posts');
        revalidatePath(`/posts/${postId}`);

        return { success: true };
    } catch(error) {
        console.error("Error updating document: ", error);
        return { success: false, error: "Failed to update post." };
    }
}