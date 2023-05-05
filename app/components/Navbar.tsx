'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react'
import styles from './Navbar.module.css';
import { BsLightbulb } from 'react-icons/bs';
import { MdQuestionMark, MdClose } from 'react-icons/md'

const Navbar: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(true);
    
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

    const dialogElement = useRef(null);

    const openDialog = () => dialogElement.current.showModal();
    const closeDialog = () => dialogElement.current.close();

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    <span className={styles.homepageLink}>Created with 🤍 by <Link href='https://ofeksror.com'>Ofek Sror</Link></span>

                    <button className={styles.modalButton} onClick={openDialog}>
                        < MdQuestionMark />
                    </button>

                    <button className={styles.themeSwitcher} onClick={handleThemeSwitch}>
                        < BsLightbulb />
                    </button>
                </div>
            </nav>

            <dialog ref={dialogElement}>
                <button className={styles.modalCloseButton} onClick={closeDialog}><MdClose /></button>
                <p>My dialog</p>
            </dialog>
        </>
  )
}

export default Navbar;