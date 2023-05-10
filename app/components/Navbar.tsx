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

                    <span className={styles.buttons}>
                        <button className={styles.modalButton} onClick={openDialog}>
                            < MdQuestionMark />
                        </button>

                        <button className={styles.themeSwitcher} onClick={handleThemeSwitch}>
                            < BsLightbulb />
                        </button>
                    </span>
                </div>
            </nav>

            <dialog className={styles.modal} ref={dialogElement}>
                <button className={styles.modalCloseButton} onClick={closeDialog}><MdClose /></button>
                <div>
                    <p>This web-app is designed to enhance your English speaking skills through interactive AI-powered conversations!<br></br>
                    As you chat with the AI, you will receive personalized feedback on your grammer and sentence structure, and suggestions to familiarize you with new words or idioms.<br></br>
                    You will communicate by recording your voice, allowing you to practice your verbal skills.<br></br>
                    We hope to provide an enriching and immersive experience to help you on your English journey!
                    </p>
                </div>
            </dialog>
        </>
  )
}

export default Navbar;