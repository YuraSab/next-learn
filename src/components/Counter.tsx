'use client';

import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState<number>(0);
    return (
        <div>
            <h2>Counter Component</h2>
            <p>You clicked {count} times</p>
            <button
                onClick={() => setCount((prev) => prev + 1)}
            >
                Click me
            </button>
        </div>
    )
}

