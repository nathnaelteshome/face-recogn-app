import React from 'react';
import'./FaceRecognition.css';
import FaceList from './FaceList';

const FaceRecognition =({IMAGE_URL, boxes}) =>{
    
    return(
        <div className="center ma ">
        <div className="absolute mt2">
            
            <FaceList boxes={boxes}/>
            <img src={IMAGE_URL} id='inputImage' alt="" width='500px' height='auto' />

        </div>
        </div>
    )
}

export default FaceRecognition;