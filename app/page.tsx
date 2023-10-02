"use client";
import {useState} from 'react'
import styles from './page.module.css'
import TextToImage from './components/TextToImage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import ImageToText from './components/ImageToText';

export default function Home() {

  const [currTool, setCurrTool] = useState('Text to Image');

  const changeAiTool = (tool: string) => {
    setCurrTool(tool);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0300bf'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header aiTool={changeAiTool}/>
      <main className={styles.main}>
        {currTool === 'Text to Image' && <TextToImage />}
        {currTool === 'Image to Text' && <ImageToText />}
      </main>
    </ThemeProvider>
  )
}
