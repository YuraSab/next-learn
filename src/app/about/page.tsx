import Image from "next/image"
// import g from "../../../public/haribo.png"
export default function About() {
    return (
      <main>
        <h1>About Me</h1>
        <Image
            src={"/haribo.png"}
            width={300}
            height={300}
            alt={"My profile photo"}
            // Цей параметр вказує на пріоритет завантаження
            priority={true}
        />
        <Image
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
            alt="Dog"
            width={300}
            height={300}
            // наступний параметр потрібний якщо не відомі розміри зображення
            // він розтягує зображення на весь лишній розмір батьківського блоку
            // fill={true}

        />
        <p>I am a software developer passionate about building modern web applications.</p>
        <p>This image is loaded using Next.js Image component for performance optimization.</p>
      </main>
    );
  }