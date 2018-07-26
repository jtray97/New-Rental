import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    updateState = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleLogin = () => {
        const redirectUri = encodeURIComponent(`${window.origin}/callback`);

        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`

    }
    render() {
        return (
            <div className="LoginPage">
                {/* <input id='username' type="text" onChange = {this.updateState}/>
                <input id ='password' type="text"onChange = {this.updateState}/> */}
                <button onClick={this.handleLogin} className="Login">Login</button>
                <br/>
                <Link to='/'><button className="skipButton">Skip login</button></Link>
            </div>
        )
    }
}
export default Login