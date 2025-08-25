export default function CommentItemSkeleton() {
    return (
      <div style={{
        height: 400,
        border: "1px solid black",
        padding: "16px",
        margin: 40
      }}>
        <div
          style={{
            width: "60%",
            height: "48px",
            backgroundColor: "#e0e0e0",
            marginBottom: "12px",
            borderRadius: "4px"
          }}
        />
        <div
          style={{
            width: "90%",
            height: "70px",
            backgroundColor: "#e0e0e0",
            marginBottom: "8px",
            borderRadius: "4px"
          }}
        />
        <div
          style={{
            width: "80%",
            height: "12px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px"
          }}
        />
      </div>
    );
  }
  