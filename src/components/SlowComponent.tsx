
interface Props {
    title: string,
    delay: number,
}

export const waitSome = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SlowComponent({ title, delay }: Props) {
    await waitSome(delay);

    return(
        <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>
            <h3>{title}</h3>
            <p>This component was loaded with a delay of {delay}ms.</p>
        </div>
    )
}