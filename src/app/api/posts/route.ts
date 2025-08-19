import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// Функція, що відповідає на GET-запити
export async function GET () {
    try {
        const postCollection = collection(db, 'posts');
        const q = query(postCollection, orderBy('createdAt', 'desc'));
        const querySnapShot = await getDocs(q);
        const posts = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        return NextResponse.json(posts);
    } catch(error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}