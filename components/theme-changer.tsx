"use client";
import {Moon, Sun} from "lucide-react";
import React from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

export default function ThemeChanger() {
    const {theme, setTheme} = useTheme();
    return (
        (theme === "dark") ? (<Button size="icon" className="rounded-full w-10 h-10" onClick={() => setTheme('light')}><Sun/></Button>
        ) : (
            <Button size="icon" className="rounded-full w-10 h-10" onClick={() => setTheme('dark')}><Moon/></Button>
        )
    );
}