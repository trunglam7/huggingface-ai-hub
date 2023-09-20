"use client";

import styles from './page.module.css'
import TextToImage from './components/TextToImage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      <main className={styles.main}>
        <TextToImage />
      </main>
    </ThemeProvider>
  )
}
