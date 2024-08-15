import { GoHome, GoStar, } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline,  } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiPlug1 } from "react-icons/ci";

export const CONTEXT_SIDEBAR =  [
    {
        title: 'Dashboard',
        path: '/dashboard/analytics',
        icon: GoHome,
        subMenus: [{
            title: 'Analytics',
            path: '/analytics'
        }
        ],
    },
    {
        title: 'Features',
        path: '/features/episodes',
        icon: GoStar,
        subMenus: [{
            title: 'Categories',
            path: '/categories'
        },
        {
            title: 'Tags',
            path: '/tags'
        },
        {
            title: 'Episodes',
            path: '/episodes'
        },
        ]
    },
    {
        title: 'Users',
        path: '/users',
        icon: FaRegUser,
        subMenus: [{
            title: 'list',
            path: '/list'
        }
        ]
    },
    {
        title: 'Pricing',
        path: '/pricing',
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
        path: '/integration',
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
        path: '/settings',
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