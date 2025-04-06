'use client';
import { useState, useEffect } from "react";
import styles from "../styles/index.module.scss";
import Link from "next/link";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <Link 
          className={`${styles.sidebar__item} ${activeTab === 0 ? styles.active : ''}`} 
          href={{pathname:"/"}}
          onClick={() => handleLinkClick(0)}
        >Inicio</Link>

        <Link 
          className={`${styles.sidebar__item} ${activeTab === 1 ? styles.active : ''}`} 
          href={{pathname:"/actions"}}
          onClick={() => handleLinkClick(1)}
        >Ações</Link>

        <Link 
          className={`${styles.sidebar__item} ${activeTab === 2 ? styles.active : ''}`} 
          href={{pathname:"/reports"}}
          onClick={() => handleLinkClick(2)}
        >Relatórios</Link>

        <Link 
          className={`${styles.sidebar__item} ${activeTab === 3 ? styles.active : ''}`} 
          href={{pathname:"/actionRegister"}}
          onClick={() => handleLinkClick(3)}
        >Registrar Ação</Link>

        <Link 
          className={`${styles.sidebar__item} ${activeTab === 4 ? styles.active : ''}`} 
          href={{pathname:"/actionCreate"}}
          onClick={() => handleLinkClick(4)}
        >Cadastrar Ação</Link>
      </nav>
    </>
  );
}
