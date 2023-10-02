import React from 'react'
import styles from '../styles/header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import {Button} from '@mui/material';

export default function Header() {
  return (
    <header className={styles.header}>
        <h1>Generative AI Hub</h1>
        <Button><MenuIcon sx={{color: 'white'}}/></Button>
    </header>
  )
}
