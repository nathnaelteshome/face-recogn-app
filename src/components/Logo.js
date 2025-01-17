import React from "react";
import Tilt from 'react-tilt';
import logo from './logo.png';
import './logo.css';

const Logo = () =>{
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2 " options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa0"> <img style={{paddingTop:'5px'}}src={logo} alt="" /> </div>
            </Tilt>

        </div>
    );
}

export default Logo;