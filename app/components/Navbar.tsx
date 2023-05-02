'use client';

import Link from 'next/link';
import { usePathname  } from 'next/navigation';
import React, { useEffect } from 'react'
import styles from './Navbar.module.css';



const Navbar: React.FC = () => {
    
    const currentPath = usePathname();

    return (
        <nav className={styles.navbar}>
            <div>
                <span className={currentPath == '/' ? styles.activeLink : styles.link}><Link href='/'>Home</Link></span>
                <span className={currentPath == '/about' ? styles.activeLink : styles.link}><Link href='/about'>About</Link></span>
            </div>
        </nav>
  )
}

export default Navbar;