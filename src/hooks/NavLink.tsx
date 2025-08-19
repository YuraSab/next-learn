'use client'

import Link from "next/link";
import "../app/globals.css";
import { usePathname } from "next/navigation";

interface NavLink {
    href: string,
    children: React.ReactNode,
}

export const NavLink = ({ href, children }: NavLink) => {
    const currenctPath = usePathname();
    return (
        <Link href={ href } className={ currenctPath === href ? "active-link" : "" }>
            { children }
        </Link>
    )
}