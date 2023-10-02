"use client";

import styles from './page.module.css'
import TextToImage from './components/TextToImage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import QuestionAnswering from './components/QuestionAnswering';
import ImageToText from './components/ImageToText';

export default function Home() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0300bf'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className={styles.main}>
        <TextToImage />
        <ImageToText />
      </main>
    </ThemeProvider>
  )
}
