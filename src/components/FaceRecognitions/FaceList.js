import React from 'react';
import Face from './Face';


function FaceList({boxes}) {
    return (
            boxes.map(box=>{
               return <Face box={box}/>
           })
            
    );
}

export default FaceList;