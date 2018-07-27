import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'



//IMPORT COMPONENTS
// import MiniProf from './MiniProf'
// import Group from './Group'

//IMPORT CSS
// import './CSS/ParallaxTesting.css'




export default class AllGroups1 extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user:'',
            subject:'blank',
            body:'blank',
        }
    }
    componentDidMount() {
        axios.get('/api/user-data').then(user => {
            if (user.data) {
                this.setState({
                    user:user.data,
                     loggedIn: true  
                })
            }
        }
        )
    }
    updateState=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    sendEmail = ()=>{
        axios.post('/api/inquire',{body:this.state.body,subject:this.state.subject})
    }
    render() {
            console.log(this.state.user)
        return (<div>
            {this.state.user.email}
            <input type="text" id ="subject" onChange={(e)=>this.updateState(e)}/>
            {this.state.subject}
            <input type="text" id ="body" onChange={(e)=>this.updateState(e)}/>
            {this.state.body}
            <br/>
            <button onClick={this.sendEmail}>send email</button>
        </div>
        )
    }
}

