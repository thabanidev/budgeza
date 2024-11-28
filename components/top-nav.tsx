"use client"
import Link from "next/link";
import Image from "next/image";
import ThemeChanger from "@/components/theme-changer";
import React from "react";
import {useTheme} from "next-themes";

export default function TopNav() {
    const {theme} = useTheme();
    return (
        <nav
            className="flex flex-row items-center justify-between container w-full p-4 md:rounded-full sticky top-0 backdrop-blur-3xl border-b md:border backdrop-filter">
            <Link href="/" className="flex gap-2 items-center text-xl">
                {theme === "dark" ? (
                    <Image alt="logo" src="images/logo-w.svg" width={40} height={40} className="rounded-full"/>
                ) : (
                    <Image alt="logo" src="images/logo-b.svg" width={40} height={40} className="rounded-full"/>
                )}
                Budgeza</Link>
            <ThemeChanger/>
        </nav>
    )
}