// src/app/page.tsx
import { Suspense } from "react";
import CommentList from "./CommentList";
import CommentListSceleton from "./CommentListSceleton";
// import ErrorBoundary from "@/components/ErrorBoundary";

export default function Comments() {
    return (
        <main>
            <h1>Comments</h1>
            {/*<ErrorBoundary> /!* Wrap the component that might fail *!/*/}
                {/* Обгортаємо компонент, що завантажує дані */}
                <Suspense fallback={ <CommentListSceleton/> }>
                    <CommentList />
                </Suspense>
            {/*</ErrorBoundary>*/}
        </main>
    );
}