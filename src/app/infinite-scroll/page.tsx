'use client'
import { Comment } from "@/types";
import { useEffect, useRef, useState } from "react";
import CommentItemSkeleton from "../comment-list/CommentItemSceleton";
import CommentItem from "../comment-list/CommentItem";

const InfiniteScrollComments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const loaderRef = useRef<HTMLDivElement | null>(null)

    const fetchComments = async () => {
        setLoading(true);
        // Імітуємо затримку
        await new Promise( (resolve) => setTimeout(resolve, 500) );
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=12`);
        const comments: Comment[] = await response.json();
        setComments((prev) => [...prev, ...comments]);
        setLoading(false);
        if (comments.length < 1)
            setHasMore(false);
    };

    useEffect(() => {
        // Intersection Observer — це вбудований браузерний API, який дозволяє вам відстежувати, коли елемент входить у видиму область сторінки (viewport)
        // Ми створюємо новий "спостерігач". Він приймає два аргументи:
        // Створюємо "спостерігач"
        const observer = new IntersectionObserver(
            // Callback-функцію: Це функція, яка буде виконуватися щоразу, коли елемент входить або виходить з видимої області. 
            // Вона отримує масив entries, де кожен елемент містить інформацію про стан відстежуваного елемента.
            (entries) => {
                // Перевіряємо, чи "завантажувач" видимий
                if (entries[0].isIntersecting && !loading && hasMore)
                    setPage((prev) => prev + 1);
            },
            // options: У нашому випадку, { threshold: 1.0 } 
            // означає, що callback-функція спрацює, коли 100% 
            // (тобто весь) відстежуваний елемент буде видимим на екрані.
            { threshold: 1.0 }
        );
        if (loaderRef.current)
            observer.observe(loaderRef.current); // Починаємо спостереження

        // Clean-up функція
        return () => {
            if (loaderRef.current)
                observer.unobserve(loaderRef.current); // Припиняємо спостереження, коли компонент розмонтується
        };
        
    }, [loading, hasMore]); // Залежності: хук повторно запуститься, якщо зміниться стан завантаження або наявність даних

    useEffect(() => {
        if (page > 0)
            fetchComments();
    }, [page]);

    return (
        <main>
            <h1>Infinite Scroll Comments</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
            }}>
                {comments.map((comment) => (
                    <CommentItem comment={comment} key={comment.id}/>
                ))}
            </div>
    
            {loading && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 20,
                }}>
                    {Array.from({ length: 12 }).map((_, id) => <CommentItemSkeleton key={id}/>)}
                </div>
            )}
    
            {hasMore && <div ref={loaderRef} style={{ height: "20px" }}></div>}
            {!hasMore && <p style={{ textAlign: 'center' }}>No more comments</p>}
        </main>
    );
}

export default InfiniteScrollComments;