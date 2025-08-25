import CommentItemSkeleton from "./CommentItemSceleton";

const CommentListSceleton = () => {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {
                Array.from({ length: 12 }).map((_, id) => <CommentItemSkeleton key={id}/>)
            }
        </div>
    )
}

export default CommentListSceleton;