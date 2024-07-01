import React from 'react';
import './nav.css';

const Navigation =({onRouteChange, isSignedIn}) =>{
        if(isSignedIn){
            // console.log("status signout",isSignedIn)
            return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p 
                onClick={()=>onRouteChange('signin')}
                className='f3 link dim black underline pa3 pointer '>Sign out</p>
            </nav>
            );
        }else{
            // console.log("status signin and register",isSignedIn)
            return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p 
                onClick={()=>onRouteChange('signin')}
                className='f4 link dim black underline pa3 pointer '>Sign In</p>
                <p 
                onClick={()=>onRouteChange('register')}
                className='f4 link dim black underline pa3 pointer '>Register</p>
            </nav>
            );

        }
    
}

export default Navigation;