import { serverTimestamp } from "firebase/firestore";

export type Post = {
    title: string;
    createdAt: ReturnType<typeof serverTimestamp>; // Повертаємо початковий тип
    content: string;
    id: string; // Додаємо id, оскільки він буде потрібен для ідентифікації
};