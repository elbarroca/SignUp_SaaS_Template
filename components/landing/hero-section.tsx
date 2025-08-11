"use client";

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, FrameIcon, Menu, X } from 'lucide-react'
import { AnimatedGroup } from '@/components/landing/animated-group'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { AuroraText } from '../magicui/aurora-text';
import { AnimatedGradientText } from '../magicui/animated-gradient-text';
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { AuthAwareButton } from "@/components/dashboard/auth-aware-button";
import { User } from '@supabase/supabase-js'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },  
        },
    },
}

export function HeroSection({ user }: { user: User | null }) {
    return (    
        <>
            <HeroHeader user={user} />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <div></div>
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants as Variants}>
                                    <div
                                        className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                        <span className="text-foreground text-sm"><AnimatedGradientText>The perfect starting point for your next project</AnimatedGradientText></span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <h1
                                        className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold tracking-tighter">
                                        Free template <AuroraText>SaaS Boilerplate</AuroraText>
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                        This template is the perfect starting point for your next project.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={transitionVariants as Variants}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <AuthAwareButton
                                        className="rounded-xl px-5 text-base"
                                        authenticatedHref="/dashboard"
                                        unauthenticatedHref="#waitlist"
                                    >
                                        <span className="text-nowrap">Join the waitlist</span>
                                    </AuthAwareButton>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={transitionVariants as Variants}
                            >
                            <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20 mx-auto">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background relative rounded-2xl w-full h-auto object-contain object-center md:aspect-[15/8]"
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngplay.com%2Fwp-content%2Fuploads%2F12%2FShrek-PNG-HD-Quality.png&f=1&nofb=1&ipt=f743cf1cd00e3f8771cb79fca813046dc26faaf32b2d7060992b86987f14172c"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="bg-background pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500">
                            <Link
                                href="/"
                                className="block text-sm duration-150 hover:opacity-75">
                                <span> Meet Our Customers</span>

                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <Image
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.RD25D2rT2JrBHqGX4-FioQHaEK%3Fpid%3DApi&f=1&ipt=a4c5ff53078c84f02fa016fce602ae504f3ec676504802df36c8d44361a60ad9&ipo=images"
                                    alt="Shrek Logo"
                                    height="20"
                                    width={20}
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/column.svg"
                                    alt="Column Logo"
                                    height="16"
                                    width={16}
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/github.svg"
                                    alt="GitHub Logo"
                                    height="16"
                                    width={16}
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/nike.svg"
                                    alt="Nike Logo"
                                    height="20"
                                    width={20}
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-5 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                    alt="Lemon Squeezy Logo"
                                    height="20"
                                    width={20}
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-4 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/laravel.svg"
                                    alt="Laravel Logo"
                                    height="16"
                                    width={16}
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-7 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/lilly.svg"
                                    alt="Lilly Logo"
                                    height="28"
                                    width={28}
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto h-6 w-fit dark:invert"
                                    src="https://html.tailus.io/blocks/customers/openai.svg"
                                    alt="OpenAI Logo"
                                    height="24"
                                    width={24}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
]

const HeroHeader = ({ user }: { user: User | null }) => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => { 
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <motion.nav
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                data-state={menuState && 'active'}
                className={cn(
                    'fixed inset-x-0 top-0 z-20 px-2 group',
                    'transition-all duration-300'
                )}>
                <div className={cn(
                    'mx-auto mt-2 max-w-7xl px-6 transition-all duration-500 lg:px-12',
                    'bg-transparent border-transparent',
                    isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <AnimatedGroup preset="slide">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedGroup>
                        </div>

                        <div className="bg-transparent group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border-0 p-6 shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 dark:shadow-none">
                            <div className="lg:hidden">
                                <AnimatedGroup preset="slide">
                                    <ul className="space-y-6 text-base">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedGroup>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <AnimatedGroup preset="slide">
                                    <div className="flex items-center gap-2">
                                        <ThemeSwitcher />
                                        {user ? (
                                            <AuthAwareButton
                                            className={cn("w-full", isScrolled ? 'lg:inline-flex' : 'hidden lg:inline-flex')}
                                            authenticatedHref="/dashboard"
                                            unauthenticatedHref="#waitlist"
                                            >
                                                <span>Join the waitlist</span>
                                            </AuthAwareButton>
                                        ) : (
                                            <AuthAwareButton
                                                className={cn("w-full", isScrolled ? 'lg:inline-flex' : 'hidden lg:inline-flex')}
                                                authenticatedHref="/dashboard"
                                                unauthenticatedHref="#waitlist"
                                            >
                                                <span>Join the waitlist</span>
                                            </AuthAwareButton>
                                        )}
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <AnimatedGroup preset="slide">
            <div className={cn("flex items-center space-x-4", className)}>
                <FrameIcon className="size-5 text-[#FF6B00]" />
                <span className="text-black dark:text-white text-xl font-bold">SaaS <AuroraText>Boilerplate</AuroraText></span>
            </div>
        </AnimatedGroup>
    )
}
