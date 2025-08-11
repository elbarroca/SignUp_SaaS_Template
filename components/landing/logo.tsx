import Link from 'next/link';
import { FrameIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuroraText } from '../magicui/aurora-text';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/" aria-label="home" className={cn("flex items-center gap-2 self-center font-medium", className)}>
            <FrameIcon className="size-6 text-[#FF6B00]" />
            <span className="text-black dark:text-white text-2xl font-bold">SaaS <AuroraText>Boilerplate</AuroraText></span>
        </Link>
    )
}
