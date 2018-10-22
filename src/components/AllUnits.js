import React, { Component } from 'react'
import Unit from './Unit'
import MiniProf from './MiniProf'
import { Link } from 'react-router-dom'
import axios from 'axios'

import GoBack from './GoBack'
import DisplayImage from './DisplayImage'


export default class AllUnits extends Component {
    constructor() {
        super()
        this.state = {
            units: [],
            type: '',
            subtype: '',
            loggedIn: false,
            search: '',
            zip_search: 0,
            radius: 2,
            zip: false,
            zip_list: [],
            dispImg: false,
            imgForDisp: ''
        }
    }
    updateSubtype = (event) => {
        if (this.state.subtype === 'Select Sub Type') {
            this.setState({ subtype: null })
        } else {
            this.setState({
                subtype: event.target.value
            })
        }
    }
    handleZip = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state.zip_search, this.state.radius)
    }


    updateSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    componentDidMount() {
        var realHash = this.props.match.path.split('/').pop() // here i'm using the props.match object
        axios.get('/api/user-data').then(user => {

            console.log(user.data)
            if (user.data !== 'redirect') {
                this.setState({
                    loggedIn: true
                })
            }
        })
        var myFilter = '';
        switch (realHash) {
            case 'packages':
                myFilter = "Packages"
                break
            case 'Experiences':
                myFilter = "Experiences"
                // Experiences
                break
            case 'Off-roaders':
                myFilter = 'Off-roaders'
                break
            case 'camping':
                myFilter = "Camping"
                break
            case 'watercraft':
                myFilter = "Watercraft"
                break
            case 'storage-and-transport':
                myFilter = 'Storage-and-Transport'
                break
            case 'party':
                myFilter = 'Party'
                break
            case 'other':
                myFilter = 'Other'
                break
            default:
                break
        }
        axios.get('/api/units').then((response => {
            this.setState({
                units: response.data,
                type: response.data.filter((e) => e.type === myFilter)
            })
        }))

    }
    //H6UUAPD4EVPV5VBKPGWW
    handleDistSearch = (radius, zip_code) => {
        console.log('clicked')
        if (zip_code > 10000 && zip_code < 99999) {
            // console.log('it worked')
            axios.get(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zip_code}&minimumradius=0&maximumradius=${radius}&key=H6UUAPD4EVPV5VBKPGWW`)
                .then((response) => {
                    var tempZip = [];
                    response.data.DataList.forEach(item => { console.log(typeof +item.Code) })
                    response.data.DataList.forEach(item => tempZip.push(+item.Code))
                    this.setState({
                        zip: true,
                        zip_list: tempZip
                    })
                    console.log('tempZip, but on state:', this.state.zip_list) // an array of zip codes.
                }).catch(err => console.log(err))
        } else {
            console.log('it did not work')
        }
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
    sendEmail = (unit_id) =>{
        console.log(unit_id)
        this.props.history.push(`/email?id=${unit_id}`)
        // axios.post('/api/inquire',{body:'',subject:'', id:''})
    }
    render() {
        // console.log(this.props.match)
        var bigImg
        if (this.state.dispImg) {
            bigImg = <DisplayImage img={this.state.imgForDisp} closePopUp={this.closePopUp} />
        } else { bigImg = null }

        var realHash = this.props.match.path.split('/').pop()
        // console.log(realHash)
        var myFilter = '';
        var subCategories = <div></div>
        switch (realHash) {
            case 'packages':
                myFilter = "Packages"
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Camping">Camping Package</option>
                            <option id='subtype' value="Watercraft">WaterSports Package</option>
                        </select>
                    </div>

                break
            case 'experiences':
                myFilter = "Experiences"
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Hot Air Balloons">Hot Air Balloons</option>
                            <option id='subtype' value="HorseBack Riding">HorseBack Riding</option>
                            <option id='subtype' value="Tours">Tours</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                break
            case 'Off-roaders':
                myFilter = 'Off-roaders'
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Quads">Quads</option>
                            <option id='subtype' value="UTVs">UTVs</option>
                            <option id='subtype' value="DirtBikes">Dirt Bikes</option>
                            <option id='subtype' value="SnowMobiles">SnowMobiles</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                break
            case 'camping':
                myFilter = "Camping"
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="RVs">RVs</option>
                            <option id='subtype' value="Fifth Wheels">Fifth Wheels</option>
                            <option id='subtype' value="Pop-Up Trailers">Pop-Up Trailers</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                break
            case 'watercraft':
                myFilter = "Watercraft"
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Speed Boats">Speed Boats</option>
                            <option id='subtype' value="Fishing Boats">Fishing Boats</option>
                            <option id='subtype' value="JetSkis">JetSkis</option>
                            <option id='subtype' value="Paddle Boats">Paddle Boats</option>
                            <option id='subtype' value="Rafts">Rafts</option>
                            <option id='subtype' value="Canoes">Canoes</option>
                            <option id='subtype' value="Kayaks">Kayaks</option>
                        </select>
                    </div>
                break
            case 'storage-and-transport':
                myFilter = 'Storage-and-Transport'
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Horse Trailers">Horse Trailers</option>
                            <option id='subtype' value="Flatbed Trailers">Flatbed Trailers</option>
                            <option id='subtype' value="Storage Units">Storage Units</option>
                            <option id='subtype' value="Rental Cars">Rental Cars</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                break
            case 'party':
                myFilter = 'Party'
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option id='subtype' value=''>Select Sub Type</option>
                            <option id='subtype' value="Bounce Houses">Bounce Houses</option>
                            <option id='subtype' value="DJs">DJs</option>
                            <option id='subtype' value="Entertainer">Entertainer</option>
                            <option id='subtype' value="Party Tents">Party Tents</option>
                            <option id='subtype' value="Seating">Seating</option>
                            <option id='subtype' value="Whole Party">Whole Party</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                break
            case 'other':
                myFilter = 'Others'
                subCategories =
                    <div className='Filter'>
                        <select name="subType" id="subType" onChange={(e) => { this.updateSubtype(e) }}>
                            <option value=''>Select Sub Type</option>
                            <option id='subtype' value="Other">Other</option>
                            <option id='subtype' value="SurfBoards">SurfBoards</option>
                            <option id='subtype' value="WakeBoards">WakeBoards</option>
                            <option id='subtype' value="KneeBoards">KneeBoards</option>
                            <option id='subtype' value="WaterSkis">WaterSkis</option>
                            <option id='subtype' value="Water Tubes">Water Tubes</option>
                            <option id='subtype' value="PaddleBoards">PaddleBoards</option>
                            <option id='subtype' value="Mountain Bikes">Mountain Bikes</option>
                        </select>
                    </div>
                break
            case 'all':
                myFilter = 'all'
                break
            default:
                break
        }


        // console.log(myFilter)
        var unitDisplay = []
        if (myFilter === 'all' || myFilter === 'All') {
            unitDisplay = this.state.units
        } else {
            unitDisplay = this.state.units.filter((e) => e.type === myFilter) // this is the main categories
        }
        // console.log(unitDisplay)
        var filteredUnitDisplay = []
        var searchUnitDisplay = []
        var displayUnits = []
        if (this.state.subtype) {
            filteredUnitDisplay = unitDisplay.filter((e) => e.subtype === this.state.subtype) //Filtered by subtype
        }
        else {
            filteredUnitDisplay = [...unitDisplay]
        }
        // basically here, either way, filteredUnitDisplay is used.  it doesn't pay attention to which one it is...
        if (this.state.search) {
            // console.log('if filteredUnitDisplay:', filteredUnitDisplay)
            // console.log('if searchUnitDisplay:', searchUnitDisplay)
            searchUnitDisplay = filteredUnitDisplay.filter(e => {
                if (e.unit_name.toLowerCase().includes(this.state.search.toLowerCase()) || e.description.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return e
                } })}



                 else {
                    searchUnitDisplay = [...filteredUnitDisplay]
                    // console.log('else filteredUnitDisplay:', filteredUnitDisplay)
                    // console.log('else searchUnitDisplay:', searchUnitDisplay)
                    // return ''
                }

                if (this.state.zip) {

                    let newArr = [];
                    for (let i = 0; i < searchUnitDisplay.length; i++) {
                        for (let j = 0; j < this.state.zip_list.length; j++) {
                            // console.log(j)
                            if (searchUnitDisplay[i].zip_code === this.state.zip_list[j]) {
                                newArr.push(searchUnitDisplay[i])
                                // console.log(searchUnitDisplay[i])
                            }
                        }
                    }
                    displayUnits = newArr
                } else {
                    displayUnits = [...searchUnitDisplay]
                    // otherwise just display searchUnitDisplay as displayUnits
                }


                if (myFilter === 'all' && !this.state.search) {
                    searchUnitDisplay = [...this.state.units]
                }
                if (myFilter === 'all' && this.state.search) {
                    var searching = [...this.state.units]
                    searchUnitDisplay = searching.filter(e => {
                        if (e.unit_name.toLowerCase().includes(this.state.search.toLowerCase()) || e.description.toLowerCase().includes(this.state.search.toLowerCase()) || e.type.toLowerCase().includes(this.state.search.toLocaleLowerCase()) || e.subtype.toLowerCase().includes(this.state.search)) {
                            return e
                            // } else { return null 
                        }
                    }
                    )
                }



                let searchDis = displayUnits.map((e, id) => <Unit type={e.type} unit_name={e.unit_name} key={id} description={e.description} ppd={e.ppd} unit_id={e.unit_id} img1={e.img1} subtype={e.subtype} zip_code={e.zip_code} contact_info={e.contact_info} contact_info2={e.contact_info2} handlePopUp={this.handlePopUp} sendEmail = {this.sendEmail} loggedIn = {this.state.loggedIn}/>)

                var searchKey =
                    <div className="zipSearch">
                        <input type="text" id="zip_search" placeholder="Input Zip Code" onChange={(e) => this.handleZip(e)} />
                        <select onChange={(e) => this.handleZip(e)} id='radius'>
                            <option value="2">2 Miles</option>
                            <option value="5">5 Miles</option>
                            <option value="10">10 Miles</option>
                            <option value="20">20 Miles</option>
                            <option value="25">25 Miles</option>
                            <option value="50">50 Miles</option>
                            <option value="75">75 Miles</option>
                            <option value="100">100 Milesnpm</option>
                        </select>
                        <button onClick={() => this.handleDistSearch(this.state.radius, this.state.zip_search)} className = 'zipSearch'>Search by Zip</button>
                    </div>

                // console.log(searchUnitDisplay)
                return (
                    <div className="testing">
                        <header className='header'>
                    <GoBack/>
                            <Link to='/'><button className='GoHome'>Go Home</button></Link>
                            <MiniProf loggedIn={this.state.loggedIn} />
                            <h1 className='TypeFilter'>{this.props.match.path.split('/').pop().toUpperCase()}</h1>
                            {subCategories}
                            <input type="text" placeholder='Search' id='search' onChange={(event => { this.updateSearch(event) })} />
                            {searchKey}
                        </header>
                        <div className="spacerDiv"></div>
                        {searchDis}
                        {(this.state.loggedIn) ? <Link to='/profile'><button>Add New</button></Link> : <Link to='/login'><button>Log in to add New</button></Link>}
                        {bigImg}
                    </div >
                )
            }
}