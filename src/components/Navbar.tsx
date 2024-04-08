"use client"
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import {
    BrainCog,
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Users2,
} from "lucide-react"

export default function Navbar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <BrainCog className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Главная</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Главная</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="sr-only">Заказы</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Заказы</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Users2 className="h-5 w-5" />
                        <span className="sr-only">Клиенты</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Клиенты</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Package className="h-5 w-5" />
                        <span className="sr-only">Склад</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Склад</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Магазин</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Магазин</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <LineChart className="h-5 w-5" />
                        <span className="sr-only">Отчет</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Отчет</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Настройки</span>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Настройки</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav>
    </aside>
  );
}
