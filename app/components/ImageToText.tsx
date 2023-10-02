
import React, { ChangeEvent, useState } from 'react'

export default function ImageToText() {

    const [image, setImage] = useState<any>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.files){
            const reader = new FileReader();

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;
              const bufferArray = new Uint8Array(arrayBuffer);
      
              // Now you have the image data as a buffer array (bufferArray)
              setImage(bufferArray);
            }
        }
        // const selectedImage = e.target.files ? e.target.files[0] : null;
        // setImage(selectedImage);
    };

    console.log(image)

    return (
    <div>
        <h1>Image To Text</h1>
        <input type='file' accept='image/*' onChange={handleImageChange} />
    </div>
    )
}
