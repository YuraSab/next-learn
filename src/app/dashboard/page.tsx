import SlowComponent from "@/components/SlowComponent";
import { Suspense } from "react";


export default function Dashboard() {
    return (
        <main>
            <h1>Dashboard</h1>
            <p>The content below will load as soon as it's ready.</p>
            {/* Головний контент буде завантажено одразу */}
            <div style={{ border: "1px solid green", padding: "1rem", margin: "1rem" }}>
                <h2>Quick Content</h2>
                <p>This part is loaded instantly.</p>
            </div>

            <Suspense fallback={<div>Loading dashboard data...</div>}>
                <SlowComponent title="Dashboard Analytics (first)" delay={4000}/>
            </Suspense>

            <Suspense fallback={<div>User profile data...</div>}>
                <SlowComponent title="User Profile (second)" delay={2000}/>
            </Suspense>
        </main>
    )
}