import React, {useState} from 'react'
import styles from '../styles/header.module.css'
import ListIcon from '@mui/icons-material/List';
import Drawer from '@mui/material/Drawer';
import {Button} from '@mui/material';

interface HeaderProps {
  aiTool: any
}

export default function Header({aiTool} : HeaderProps) {


  const [aiMenu, setAiMenu] = useState(false);
  const [currTool, setCurrTool] = useState('Text to Image');

  const openAiMenu = () => {
    setAiMenu(true);
  }

  const closeAiMenu = () => {
    setAiMenu(false);
  }

  const changeAiTool = (tool : string) => {
    setCurrTool(tool);
    aiTool(tool);
    setAiMenu(false);
  }

  return (
    <header className={styles.header}>
        <h1>Generative AI Hub</h1>
        <div className={styles.header_right}>
          <b>{currTool}</b>
          <Button onClick={openAiMenu}>
            <ListIcon sx={{color: 'white'}}/>
          </Button>
          <Drawer
            anchor='right'
            open={aiMenu}
            onClose={closeAiMenu}
          >
            <div className={styles.btn_container}>
              <Button onClick={() => changeAiTool('Text to Image')}>Text to Image</Button>
              <Button onClick={() => changeAiTool('Image to Text')}>Image to Text</Button>
            </div>
          </Drawer>
        </div>
    </header>
  )
}
