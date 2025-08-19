export type Post = {
    id: string;
    title: string;
    date: string;
    content: string;
  };
  
  export const posts: Post[] = [
    {
      id: "1",
      title: "Introduction to Next.js",
      date: "2023-01-01",
      content: "Next.js is a powerful React framework for building full-stack web applications.",
    },
    {
      id: "2",
      title: "Dynamic Routing in Next.js",
      date: "2023-02-15",
      content: "Learn how to create dynamic routes for your blog posts with the App Router.",
    },
    {
      id: "3",
      title: "Server Components vs Client Components",
      date: "2023-03-20",
      content: "Understanding the difference between server and client components is key to building fast apps.",
    },
  ];