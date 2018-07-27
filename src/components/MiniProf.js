import React from 'react'
import{Link} from 'react-router-dom'
// import Button from 'styled-components'
export default function MiniProf(props) {
    function handleLogin (){
        const redirectUri = encodeURIComponent(`${window.origin}/callback`);
  
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`

    }
    // console.log(props)
    if (props.loggedIn){
        return(<Link to = '/profile'><button className='MiniProf' id='goToProfile'>Go to profile</button></Link>)
    }else{
        return (
            <button className="MiniProf" id="LogIn" onClick={handleLogin}>Log in</button>
            
        )
    
    }
}