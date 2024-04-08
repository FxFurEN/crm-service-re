"use client"

import React, { useState } from "react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    BrainCog,
    Home,
    LineChart,
    Package,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Users2,
} from "lucide-react";

interface ButtonData {
    icon: React.ElementType;
    label: string;
    route: string; 
}

const buttonsData: ButtonData[] = [
    { icon: Home, label: "Главная", route: "/home" }, 
    { icon: ShoppingBag, label: "Заказы", route: "/orders" }, 
    { icon: Users2, label: "Клиенты", route: "/clients" }, 
    { icon: Package, label: "Склад", route: "/warehouse" }, 
    { icon: ShoppingCart, label: "Магазин", route: "/shop" }, 
    { icon: LineChart, label: "Отчет", route: "/reports" }, 
];

export default function Navbar() {
    const [activeButton, setActiveButton] = useState<number | null>(null);

    const handleButtonClick = (buttonIndex: number) => {
        setActiveButton((prevState) => (prevState === buttonIndex ? null : buttonIndex));
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <div
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <BrainCog className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </div>
                <TooltipProvider>
                    {buttonsData.map((button, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <Link href={button.route} passHref>
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                            activeButton === index
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        onClick={() => handleButtonClick(index)}
                                    >
                                        <button.icon className="h-5 w-5" />
                                        <span className="sr-only">{button.label}</span>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{button.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/settings" passHref>
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                        activeButton === null ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    onClick={() => setActiveButton(null)}
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Настройки</span>
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Настройки</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}

