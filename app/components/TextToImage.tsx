import React, {useState} from 'react'
import { HfInference } from '@huggingface/inference'
import styles from '../styles/textToImage.module.css'
import { CircularProgress, Button, TextField, Select, MenuItem } from '@mui/material';

import ImgWrapper from './ImgWrapper';

export default function TextToImage() {

    const [userQuery, setUserQuery] = useState('');
    const [generatingImage, setGeneratingImage] = useState(false);
    const [imageReady, setImageReady] = useState(false);
    const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
    const [numImg, setNumImg] = useState(1);

    const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

    const handleSelectChange = (event : any) => {
        setNumImg(event.target.value);
    }

    const submitQuery = async () => {
        try {
            setGeneratingImage(true);
            setImageReady(false);

            const tempImgArray = [];
            for(let i = 0; i < numImg; i++){
                const uniqueUserQuery = userQuery + ' ' + Date.now();
                const model = await hf.textToImage({
                    inputs: uniqueUserQuery,
                    model: 'stabilityai/stable-diffusion-2',
                    parameters: {
                    negative_prompt: 'blurry',
                    }
                });

                //setImageUrl(URL.createObjectURL(model));
                tempImgArray.push(URL.createObjectURL(model));
                setImageUrlArray([...tempImgArray]);
                setImageReady(true);

            }

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
            <div className={styles.imageContainer}>
                {imageReady && imageUrlArray.map(imgUrl => <ImgWrapper imgUrl={imgUrl} />)}
            </div>
            <div className={styles.inputForm}>
                <TextField variant='outlined' label='Query' onChange={(e) => setUserQuery(e.target.value)}/>
                <Select
                    labelId='number-of-images'
                    id='number-of-images'
                    value={numImg}
                    label='Number of Images'
                    onChange={handleSelectChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
                <Button variant='contained' onClick={submitQuery}>Submit</Button>
            </div>
        </div>
    )
}
