import React from 'react'
import styles from '../styles/imgWrapper.module.css'
import { ImgWrapperProps } from '@/types'

export default function ImgWrapper({imgUrl} : ImgWrapperProps) {
  return (
    <div className={styles.mainContainer}>
        <img src={imgUrl} alt='generated image'/>
    </div>
  )
}
