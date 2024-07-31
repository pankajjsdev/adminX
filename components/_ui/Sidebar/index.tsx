'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { GoHome, GoStar, GoCircle, GoChevronRight, } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline,  } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiPlug1 } from "react-icons/ci";
import { Separator } from "@/components/ui/separator"
import { title } from 'process';


const links = [
    {
        title: 'Dashboard',
        path: '/',
        icon: GoHome,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
    {
        title: 'Features',
        path: '/',
        icon: GoStar,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
    {
        title: 'Users',
        path: '/',
        icon: FaRegUser,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
    {
        title: 'Pricing',
        path: '/',
        icon: AiOutlineDollarCircle,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
    {
        title: 'Integration',
        path: '/',
        icon: CiPlug1,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
    {
        title: 'Settings',
        path: '/',
        icon: IoSettingsOutline,
        subMenus: [{
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        },
        {
            title: 'All Pages v1',
            path: '/all'
        }
        ],
    },
];

function Sidebar() {
    const [showSubMenu, setShowSubMenu] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setShowSubMenu(showSubMenu === index ? null : index);
    };

    return (
        <aside className='w-[25%] h-dvh flex flex-col items-center px-7 shadow'>
            <div className='my-7'>
                <Image src="/next.svg" width={100} height={100} alt='Logo' />
            </div>
            <Separator />

            <ul className='my-7 space-y-4 w-full'>
                {links.map((link, index) => (
                    <li key={index} className='p-2'>
                        <div
                            className='flex items-center justify-between transition-all duration-500 ease-in-out w-full text-left cursor-pointer group'
                            onClick={() => handleToggle(index)}
                        >
                            <div className='flex items-center'>
                                <link.icon size={20} className='mx-2' />
                                <span className='ml-2 text-primary'>
                                    {link.title}
                                </span>
                            </div>
                            <GoChevronRight
                                className={`transition-all duration-500 ease-in-out ${showSubMenu === index ? 'rotate-90' : ''}`}
                            />
                        </div>
                        <ul
                            className={`overflow-hidden space-y-2 transition-all duration-500 ease-in-out ${showSubMenu === index ? 'max-h-40 mt-4' : 'max-h-0'
                                }`}
                        >
                            {link.subMenus.map((subLink, subIndex) => (
                                <li key={subIndex} className=''>
                                    <Link className='text-base pl-10' href={subLink.path}>
                                        {subLink.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>

    );
}

export default Sidebar;
