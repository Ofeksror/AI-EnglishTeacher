'use client';

import Link from 'next/link';
import { usePathname  } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css';
import { BsLightbulb } from 'react-icons/bs';

const Navbar: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    const [showDropdown, setShowDropdown] = useState(false);

    const handleThemeSwitch = () => {
        setDarkTheme(!darkTheme);
        if (darkTheme) {
          document.body.classList.remove('light');
          document.body.classList.add('dark');
        }
        else {
          document.body.classList.remove('dark');
          document.body.classList.add('light');
        }
    }

    return (
        <nav className={styles.navbar}>
            <div>
                <span className={styles.homepageLink}>Created with 🤍 by <Link href='https://ofeksror.com'>Ofek Sror</Link></span>

                <button className={styles.themeSwitcher} onClick={handleThemeSwitch}>
                    < BsLightbulb />
                </button>
            </div>
        </nav>
  )
}

export default Navbar;