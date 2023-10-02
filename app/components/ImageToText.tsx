
import { HfInference } from '@huggingface/inference';
import React, { ChangeEvent, useState } from 'react'
import {CircularProgress} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styles from '../styles/imageToText.module.css'

export default function ImageToText() {

    const [image, setImage] = useState('');
    const [text, setText] = useState('');

    const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.files){
            try {
                setText('');
                const img = e.target.files[0]
                const reader = new FileReader();

                reader.onload = async () => {

                    const blob = new Blob([reader.result as ArrayBuffer]);
                    const imageUrl = URL.createObjectURL(blob);
                    setImage(imageUrl);

                    const model = await hf.imageToText({
                        data: reader.result as ArrayBuffer,
                        model: 'Salesforce/blip-image-captioning-large'
                    });

                    setText(model.generated_text)
                }

                reader.readAsArrayBuffer(img);
            } catch (err) {
                console.log('Error generating text:', err);
            }
        }
    };

    return (
    <div className={styles.main_container}>
        <h1>Image To Text</h1>
        <br />
        <label htmlFor='image-input' style={{cursor: 'pointer'}}><AddPhotoAlternateIcon sx={{fontSize: '3rem'}}/></label>
        <input style={{display: 'none'}} type='file' accept='image/*' id='image-input' onChange={handleImageChange} />
        {image && <img className={styles.img_preview} src={image} alt='uploaded image' />}
        {(image && !text) && (<><br /><CircularProgress /></>)}
        {text && <b style={{textAlign: 'center'}}>{text}</b>}
    </div>
    )
}
