'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { CONTEXT_SIDEBAR } from '@/lib/Context'
import { GoChevronRight, } from "react-icons/go";
import { ModeToggle } from '@/components/ui/theme-controll'
import { usePathname } from 'next/navigation'


function Sidebar() {
    const [showSubMenu, setShowSubMenu] = useState<number | null>(null);
    const pathname = usePathname()

    const handleToggle = (index: number) => {
        setShowSubMenu(showSubMenu === index ? null : index);
    };

    return (
        <aside className='w-[25%] h-dvh flex flex-col items-center px-7  shadow relative'>
            <div className='my-7'>
                <h1 className='text-3xl text-primary font-semibold mr-2'>Admin <span className='text-6xl'>X</span></h1>
            </div>
            <Separator />
            <ul className='my-7 space-y-4 w-full'>
                {
                    CONTEXT_SIDEBAR.map((link, index) => {
                        const isPathActive = pathname.includes(link.path)
                        return (
                            <li key={index} className=''>
                                <div className={`flex items-center justify-between transition-all duration-500 ease-in-out w-full text-left cursor-pointer group hover:bg-secondary rounded-md p-2 ${isPathActive ? 'bg-secondary' : ''}`} onClick={() => handleToggle(index)} >
                                    <div className='flex items-center'>
                                        <link.icon size={20} className='mx-2 text-primary' />
                                        <Link href={link.path} className='ml-2 text-primary'>
                                            {link.title}
                                        </Link>
                                    </div>
                                    <GoChevronRight
                                        className={`transition-all duration-500 ease-in-out ${showSubMenu === index ? 'rotate-90' : ''}`}
                                    />
                                </div>
                                <ul className={`overflow-hidden space-y-2 transition-all duration-500 ease-in-out ${showSubMenu === index ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                                    {link.subMenus.map((subLink, subIndex) => {
                                        const isSubLinkActive = pathname == `${link.path}${subLink.path}`
                                        return (
                                            <li key={subIndex} className={`rounded-md hover:bg-secondary  p-2 ${isSubLinkActive ? 'bg-secondary' : ''}`}>
                                                <Link className='text-base text-primary pl-10' href={`${link.path}${subLink.path}`}>
                                                    {subLink.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
            <div className='absolute bottom-4 left-7'>
                <ModeToggle />
            </div>
        </aside>

    );
}

export default Sidebar;
