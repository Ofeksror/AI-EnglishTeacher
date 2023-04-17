'use client';

import Link from 'next/link';
import { usePathname  } from 'next/navigation';
import React from 'react'



const Navbar: React.FC = () => {
    
    const currentPath = usePathname()

    return (
        <nav className='navbar'>
            <ul>
                <li><Link href='/' className={currentPath === '/' ? 'active-link' : ''}>Home</Link></li>
                <li><Link href='/about' className={currentPath === '/about' ? 'active-link' : ''}>About</Link></li>
            </ul>
        </nav>
  )
}

export default Navbar;