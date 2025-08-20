import { getPost } from "@/actions/posts";
import PostForm from "@/components/PostForm";

interface Props {
    params: {
        postId: string;
    };
}

export default async function EditPostPage({ params }: Props) {
    const { postId } = params;
    const result = await getPost(postId); // Завантажуємо дані на сервері

    if (!result.success || !result.post)
        return <div style={{ textAlign: 'center', fontSize: '1.25rem', marginTop: '2.5rem' }}>Пост не знайдено.</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
            <PostForm initialProps={result.post} />
        </div>
    )
}