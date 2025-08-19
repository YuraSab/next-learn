import { Counter } from "@/components/Counter";

export default function StatusPage() {
    const currentTime = new Date().toLocaleTimeString('uk-UA');
    return (
        <main>
            <h1>Server Status</h1>
            <p>This page is server-rendered.</p>
            <p>Current server time: {currentTime}</p>
            <Counter/>
        </main>
    )
}