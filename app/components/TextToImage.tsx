import React, {useEffect, useState} from 'react'
import { HfInference } from '@huggingface/inference'
import styles from '../styles/textToImage.module.css'
import { CircularProgress, Button, TextField } from '@mui/material';

import ImgWrapper from './ImgWrapper';

export default function TextToImage() {

    const [userQuery, setUserQuery] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [generatingImage, setGeneratingImage] = useState(false);
    const [imageReady, setImageReady] = useState(false);

    const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

    const submitQuery = async () => {
        try {
            setGeneratingImage(true);
            setImageReady(false);

            const uniqueUserQuery = userQuery + Date.now();
            const model = await hf.textToImage({
                inputs: uniqueUserQuery,
                model: 'stabilityai/stable-diffusion-2',
                parameters: {
                  negative_prompt: 'blurry',
                }
            });

            setImageUrl(URL.createObjectURL(model));
        } catch (err) {
            console.log("Error generating image", err);
        } finally {
            setGeneratingImage(false);
            setImageReady(true);
        }
    }

    return (
        <div className={styles.mainContainer}>
            <h1>Text to Image Generator</h1>
            <br />
            {generatingImage && <CircularProgress />}
            {imageReady && <ImgWrapper imgUrl={imageUrl} />}
            <div className={styles.inputForm}>
                <TextField variant='outlined' label='Query' onChange={(e) => setUserQuery(e.target.value)}/>
                <Button variant='contained' onClick={submitQuery}>Submit</Button>
            </div>
        </div>
    )
}
