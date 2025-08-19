// src/app/edit-post/[postId]/page.tsx
// Немає "use client" тут

import EditForm from "./EditForm";

interface Props {
    params: {
        postId: string;
    };
}

export default function EditPostPage({ params }: Props) {
    return <EditForm postId={params.postId} />;
}