import React from 'react'
import styles from '../styles/imgWrapper.module.css'
import { ImgWrapperProps } from '@/types'

export default function ImgWrapper({imgUrl} : ImgWrapperProps) {

  const handleDragStart = (e : any) => e.preventDefault();

  return (
    <div className={styles.mainContainer}>
        <img src={imgUrl} alt='generated image' onDragStart={handleDragStart} role='presentation'/>
    </div>
  )
}
