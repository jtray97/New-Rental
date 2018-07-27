import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//IMPORT COMPONENTS
import MiniProf from './MiniProf'
// import Group from './Group'

//IMPORT CSS




export default class AllGroups extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false
        }
    }
    componentDidMount() {
        axios.get('/api/user-data').then(user => {
            if (user.data !=='redirect') {
                this.setState({
                    loggedIn: true
                })
            }
        }
        )
    }


    render() {
        return (

            <div className="AllGroups">
                <MiniProf loggedIn={this.state.loggedIn}/>
            <div className="parallax-container">
                    {/* <div className="six layer" ></div> */}
                    <div className="five layer"></div>
                    <div className="four layer" ></div>
                    <div className="three layer"></div>
                    <div className="two layer"></div>
                    <div className="one layer"></div>

                <div className="allBut">

                    <div className="groups" id="Off-roaders">
                        <h1 className="groupName NameDown" id="">Off-Roaders & Quads</h1>
                        <Link to='./Off-roaders'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>


                    <div className="groups " id='camping'>
                        <h1 className="groupName NameUp">RVs & Campers</h1>
                        <Link to='./camping'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>

                    {/* <div className="groups " id='packages'>
                        <h1 className="groupName NameDown">Packages & Other</h1>
                        <Link to='./packages'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div> */}

                    <div className="groups " id='watercraft'>
                        <h1 className="groupName NameUp">Boats & Jetskis</h1>
                        <Link to='./watercraft'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>



                    <div className="groups " id='experiences'>
                        <h1 className="groupName NameUp">Experiences & Tours</h1>
                        <Link to='./experiences'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>

                    <div className="groups " id='party'>
                        <h1 className="groupName NameUp">Party Equipment</h1>
                        <Link to='./party'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>

                    <div className="groups " id='storage-and-transport'>
                        <h1 className="groupName NameDown">Storage & Transport</h1>
                        <Link to='./storage-and-transport'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>
                    <div className="groups " id='others'>
                        <h1 className="groupName NameUp">Other/ Misc.</h1>
                        <Link to='./other'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>
                    <div className="groups" id='all'>
                        <h1 className="groupName ">All</h1>
                        <Link to='./all'>
                            <div className="groupsLink"></div>
                        </Link>
                    </div>

                </div>
                </div>

            </div>

        )
    }
}

