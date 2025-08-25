import { serverTimestamp } from "firebase/firestore";

export type Post = {
    title: string;
    createdAt: string; // Змінено на string
    content: string;
    id: string; // Додаємо id, оскільки він буде потрібен для ідентифікації
};

export type Comment = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
}