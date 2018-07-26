import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Unit from './Unit'


//IMPORT COMPONENTS
import MiniProf from './MiniProf'
import swal from 'sweetalert2';
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
            unit:[]
        }
    }
    componentDidMount() {
        var realHash = window.location.hash.split('=').pop()
        axios.get(`/api/getOne/${+realHash}`).then(unit=>{
            this.setState({
                unit:unit.data
            })
            console.log(unit)
        })
        // console.log(this.state.unit)
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
        if(this.state.subject==='blank' || this.state.body ==='blank'){
            swal({
                icon:'error',
                text:'Please fill in both Subject and Body.'
            })
            console.log('sway alert needed')
        }else if (this.state.subject !=='blank' && this.state.body!=='blank'){

            var realHash = window.location.hash.split('=').pop()
            // console.log(window.location.hash)
            // console.log(realHash)
        axios.post('/api/inquire',{body:this.state.body,subject:this.state.subject, unit_id:realHash}).then(()=>{console.log('email sent')
    swal({
        icon:'success',
        text:'Email was sent successfully'
    })}).then(this.props.history.push('/'))
    }
    }
    render() {
    let displayUnit= <Unit type={this.state.unit.type} unit_name={this.state.unit.unit_name} description={this.state.unit.description} ppd={this.state.unit.ppd} unit_id={this.state.unit.unit_id} img1={this.state.unit.img1} subtype={this.state.unit.subtype} zip_code={this.state.unit.zip_code} contact_info={this.state.unit.contact_info} contact_info2={this.state.unit.contact_info2} handlePopUp={this.handlePopUp} sendEmail = {this.sendEmail} />
            // console.log(this.state.user)
            // console.log(this.props)
            return (<div>
                <MiniProf loggedIn={this.state.loggedIn}/>
            {this.state.user.email}
            <input type="text" id ="subject" onChange={(e)=>this.updateState(e)}/>
            {this.state.subject}
            <input type="text" id ="body" onChange={(e)=>this.updateState(e)}/>
            {this.state.body}
            <br/>
            <button onClick={this.sendEmail}>send email</button>
            {displayUnit}
        </div>
        )
    }
}