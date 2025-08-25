// src/app/page.tsx
import { Suspense } from "react";
import CommentList from "./CommentList";
import CommentListSceleton from "./CommentListSceleton";

export default function Comments() {
    return (
        <main>
            <h1>Comments</h1>
            {/* Обгортаємо компонент, що завантажує дані */}
            <Suspense fallback={ <CommentListSceleton/> }>
                <CommentList />
            </Suspense>
        </main>
    );
}