import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import New from './New'

import Unit from './Unit'
import swal from 'sweetalert2'
import Edit from './Edit'
import DisplayImage from './DisplayImage'
import GoBack from './GoBack'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            user_units: [],
            edit: false,
            dispImg: false,
            imgForDisp: ''
        }
    }
    handleDelete = (id) => {

        console.log('Delete me!', `ID=${id}`)
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete(`/api/deleteUnit/${id}`).then((response) => {
                    //HERE I WANT TO UPDATE THE AllUnits COMPONENT.
                    // console.log(response)
                    this.setState({
                        user_units: response.data
                    })
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
                )
            }
        })
    }
    handleCancel = () => {
        this.setState({
            edit: false
        })
    }
    handleEdit = (id) => {
        console.log(`you want to edit ${id}`)
        let oneObj = this.state.user_units.filter((e) => {
            if (e.unit_id === id) {
                return e.unit_id = id
            }
            else return null
        })

        this.setState({
            edit: oneObj
        })
        // console.log(this.state.edit)
    }
    handlePopUp = (img) => {
        console.log('clicked')
        this.setState({
            dispImg: true,
            imgForDisp: img
        })
        console.log(this.state.dispImg, img)
    }
    closePopUp = () => {
        this.setState({
            dispImg: false
        })
    }
    profileHandleUpdate = () => {
        console.log('made it to profileHandleUpdate')
        axios.get(`/api/user_units/${this.state.user.id}`).then((response) => {
            // console.log(response.data)
            this.setState({
                edit: '',
                user_units: response.data
            })

        }
        )
    }
    componentDidMount() {
        axios.get('/api/user-data').then(user => {
            if (user.data !== 'redirect') {
                this.setState({
                    loggedIn: true,
                    user: user.data
                })
            } else (this.props.history.push('/'))
        }
    ).then(()=>{

        
        
        // console.log('hello this mounted fine')
        
        axios.get(`/api/user_units/${this.state.user.id}`).then((response) => {
            // console.log(response.data)
            this.setState({
                user_units: response.data
            })
        })
        });
    }

    handlePopUp = (img) => {
        console.log('clicked')
        this.setState({
            dispImg: true,
            imgForDisp: img
        })
        console.log(this.state.dispImg, img)
    }
    closePopUp = () => {
        this.setState({
            dispImg: false
        })
    }
    handleLogout = () => {
        axios.get('/api/logout').then(() => { this.props.history.push('/login') })
    }
    render() {
        // console.log(this.state.loggedIn)
        var bigImg
        if (this.state.dispImg) {
            bigImg = <DisplayImage img={this.state.imgForDisp} closePopUp={this.closePopUp} />

        } else {
            bigImg = null
        }

        var UserUnits = this.state.user_units.map(
            (e, id) => {
                // console.log(e.contact_info)
                return (
                    <Unit
                        type={e.type}
                        key={id}
                        unit_name={e.unit_name}
                        ppd={e.ppd}
                        description={e.description}
                        edit={true}
                        unit_id={e.unit_id}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        subtype={e.subtype}
                        img1={e.img1}
                        zip_code={e.zip_code}
                        contact_info={e.contact_info}
                        contact_info2={e.contact_info2}
                        handlePopUp={this.handlePopUp} />
                )
            }
        )


        // console.log(this.state.user_units)
        return (

            <div className="Profile">
                <GoBack/>
                <div className="testing">
                    <br />
                    <Link to='/'><button className = 'goBackProfile' >Go Back</button></Link>
                    <button onClick={this.handleLogout} className = 'logout'>Logout</button>
                    <br />
                    <br />
                    <img src={this.state.user.user_img} alt="User" className="profilePicture" />
                    <p>User Name: {this.state.user.name}</p>
                    <br />
                    {
                        (!this.state.edit) ? (
                            <div>
                                <Link to='/new'><button className='addNewProfile'>Add New</button></Link>
                                {UserUnits}
                            </div>
                        )
                            : (

                                <div>
                                    {console.log('contact_info', this.state.edit[0].contact_info)}
                                    {/* {console.log(this.state.edit[0].contact_info2)} */}
                                    <Edit img1={this.state.edit[0].img1} img2={this.state.edit[0].img2} img3={this.state.edit[0].img3} img4={this.state.edit[0].img4} unit_name={this.state.edit[0].unit_name} description={this.state.edit[0].description} ppd={this.state.edit[0].ppd} type={this.state.edit[0].type} zip_code={this.state.edit[0].zip_code} handleCancel={this.handleCancel} profileHandleUpdate={this.profileHandleUpdate} subtype={this.state.edit[0].subtype} unit_id={this.state.edit[0].unit_id} contact_info={this.state.edit[0].contact_info} contact_info2={this.state.edit[0].contact_info2} />
                                </div>

                            )

                    }
                    {/* <Unit name = {'I own this one'} edit = {true}/> */}
                    {bigImg}
                </div>
            </div>
        )
    }
}

export default Profile