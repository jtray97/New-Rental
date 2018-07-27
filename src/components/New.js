import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Unit from './Unit'
import swal from 'sweetalert2';
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import DisplayImage from './DisplayImage'
// import { runInThisContext } from 'vm';
class New extends Component {
    constructor(props) {
        super()
        // console.log('constructor')
        this.state = {
            unit_name: '',
            ppd: '',
            description: '',
            zip_code: '',
            type: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            user: [],
            input: true,
            subtype: '',
            contact_info: '',
            contact_info2: '',
            dispImg: false,
            imgForDisp: '',
            isUploading: false,
            images: [],
            url: 'http://via.placeholder.com/200x200',
            value: ''

        }
    }
    

    // MY FUNCTIONS:
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
    componentDidMount() {
        // console.log('comp did mougnt')
        axios.get('/api/user-data').then(response =>
            {
                if(response.data === 'redirect'){

                    this.props.history.push('/')   
                } else {
                        this.setState({
                            user: response.data
                        }) 
                }
            }
        )
    }
    updateState = (event) => {
        // console.log('handle update state')
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleType = (e) => {
        console.log('this ran, handle tpe')
        this.setState({
            type: e.target.value
        })
    }

    handleInsert = () => {

        if (!this.state.contact_info) { console.log('contact_info is missing') }
        if (!this.state.unit_name) { console.log('Name is missing') }
        if (!this.state.ppd) { console.log('PPD is missing') }
        if (!this.state.description) { console.log('Description is missing') }
        if (!this.state.zip_code) { console.log('zip code is missing') }
        if (!this.state.type) { console.log('type is missing') }
        if (!this.state.img1) { console.log('primary image is missing') }
        console.log(this.state.user)

        // console.log('Function Clicked')
        // console.log('There is zip code', this.state.zip_code?true:false)
        // console.log('There is type',this.state.type?true:false)
        // console.log('there is primary img',this.state.img1?true:false)


        if (!this.state.contact_info || !this.state.user || !this.state.unit_name || !this.state.ppd || !this.state.description || !this.state.zip_code || !this.state.type || !this.state.img1) {
            // console.log('Something has not been filled in')
            swal({
                type: "error",
                text: "Error! Seems like something wasn't filled in!"
            })
        } else {

            console.log('everything was filled, everything is fine.')
            axios.post('/api/newUnit', { unit_name: this.state.unit_name, ppd: this.state.ppd, description: this.state.description, type: this.state.type, zip_code: this.state.zip_code, img1: this.state.img1, img2: this.state.img2, img3: this.state.img3, img4: this.state.img4, owner_id: this.state.user.id, subtype: this.state.subtype, contact_info: this.state.contact_info, contact_info2: this.state.contact_info2 })
                .then((response) => {
                    // this.props.history.push('http://localhost:3000/#/profile')
                    console.log(response.data)
                    swal({
                        type: "success",
                        text: "Everything was uploaded successfully!"
                    })
                    this.props.history.push('/profile')
                })
                .catch(err => {
                    console.log(err)
                    swal({
                        type: "error",
                        text: "Something went wrong!"
                    })
                })
        }
        return
    }
    updatesubtype = (e) => {
        this.setState(
            {
                subtype: e.target.value
            }
        )
    }
    switching = () => {

        switch (this.state.type) {
            case '':
                return (
                    <div>
                        <select name="subType" id="subType">
                            <option value="blank">Please select type</option>
                        </select>
                    </div>
                )
            case 'Off-roaders':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Quads">Quads</option>
                            <option id='subtype' value="UTVs">UTVs</option>
                            <option id='subtype' value="DirtBikes">Dirt Bikes</option>
                            <option id='subtype' value="SnowMobiles">SnowMobiles</option>
                            <option id='subtype' value="Other">Other</option>


                        </select>
                    </div>
                )
            case 'Camping':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="RVs">RVs</option>
                            <option id='subtype' value="Fifth Wheels">Fifth Wheels</option>
                            <option id='subtype' value="Pop-Up Trailers">Pop-Up Trailers</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                )
            case 'Packages':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Camping">Camping Package</option>
                            <option id='subtype' value="Watercraft">WaterSports Package</option>
                        </select>
                    </div>
                )
            case 'Watercraft':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>

                            <option id='subtype' value="Speed Boats">Speed Boats</option>
                            <option id='subtype' value="Fishing Boats">Fishing Boats</option>
                            <option id='subtype' value="JetSkis">JetSkis</option>
                            <option id='subtype' value="Paddle Boats">Paddle Boats</option>
                            <option id='subtype' value="Rafts">Rafts</option>
                            <option id='subtype' value="Canoes">Canoes</option>
                            <option id='subtype' value="Kayaks">Kayaks</option>
                        </select>
                    </div>
                )
            case 'Experiences':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Hot Air Balloons">Hot Air Balloons</option>
                            <option id='subtype' value="HorseBack Riding">HorseBack Riding</option>
                            <option id='subtype' value="Tours">Tours</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                )
            case 'Party':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Bounce Houses">Bounce Houses</option>
                            <option id='subtype' value="DJs">DJs</option>
                            <option id='subtype' value="Entertainer">Entertainer</option>
                            <option id='subtype' value="Party Tents">Party Tents</option>
                            <option id='subtype' value="Seating">Seating</option>
                            <option id='subtype' value="Whole Party">Whole Party</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                )
            case 'Storage-and-Transport':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Horse Trailers">Horse Trailers</option>
                            <option id='subtype' value="Flatbed Trailers">Flatbed Trailers</option>
                            <option id='subtype' value="Storage Units">Storage Units</option>
                            <option id='subtype' value="Rental Cars">Rental Cars</option>
                            <option id='subtype' value="Other">Other</option>
                        </select>
                    </div>
                )
            case 'Others':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select sub type</option>
                            <option id='subtype' value="Other">Other</option>
                            <option id='subtype' value="SurfBoards">SurfBoards</option>
                            <option id='subtype' value="WakeBoards">WakeBoards</option>
                            <option id='subtype' value="KneeBoards">KneeBoards</option>
                            <option id='subtype' value="WaterSkis">WaterSkis</option>
                            <option id='subtype' value="Water Tubes">Water Tubes</option>
                            <option id='subtype' value="PaddleBoards">PaddleBoards</option>
                        </select>
                    </div>
                )
            default:
                break
        }
    }
    uploadFile = (file, signedRequest, url) => {
    
        var options = {
          headers: {
            'Content-Type': file.type
          }
        };
        axios.put(signedRequest, file, options)
        .then( response => {
          this.setState({isUploading: false, img1: url})
          // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
        })
        .catch( err => {
          console.log(err)
        })
      }
    
      
      getSignedRequest = (file) => {
        const fileName = 'ta1-' + file.name.replace(/\s/g, '-')
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.setState({isUploading: true})
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
          console.log(err)
        })
      }
      
      addFile = ([file]) => {
        // const file = files[0]
        this.getSignedRequest(file)
      }
    render() {
        var bigImg
        if (this.state.dispImg) {
            bigImg = <DisplayImage img={this.state.imgForDisp} closePopUp={this.closePopUp} />
        } else { bigImg = null }
        if (this.state.user === false) {
            this.props.history.push('/')
            swal({
                type: 'error',
                title: 'Please log in.'
            })
        }

        return (
            <div className="new">
                New
                {bigImg}
                <div className="Unit">
                    <div className='imageInputDivs'>
                    <Dropzone
                        onDropAccepted={this.addFile}
                        style={{
                            position: 'relative',
                            width: 200,
                            height: 200,
                            borderWidth: 7,
                            borderColor: 'rgb(102, 102, 102)',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            float:'Left',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 28,
                        }}
                        accept='image/*'
                        multiple={false} >

                        {this.state.isUploading
                            ? <GridLoader />
                            : <p>Drop File or Click Here</p>
                        }
                    </Dropzone>
                        {/* <input id="img1" placeholder='Primary Image' type="text" className='imageInput' onChange={this.updateState} /> */}
                        {/* <input id="img2" placeholder='Image 2' type="text" className='imageInput' />
                        <input id="img3" placeholder='Image 3' type="text" className='imageInput' />
                        <input id="img4" placeholder='Image 4' type="text" className='imageInput' /> */}
                    </div>
                    <div className='UnitDesc'>
                        <div className="namePrice">
                            <input type="text" placeholder='Name' id='unit_name' onChange={this.updateState} />
                            <input type="number" placeholder='Price per day' id='ppd' onChange={this.updateState} />
                            {/* <hr /> this is the weird line under image 4 */}
                        </div>
                        <input type="text" placeholder='Description' id='description' onChange={this.updateState} />
                        <input type="number" placeholder='Zip Code' id='zip_code' onChange={this.updateState} />
                        <input type="text" placeholder='Shown Contact Info' id='contact_info' onChange={this.updateState} />
                        <input type="text" placeholder='Shown Contact Info' id='contact_info2' onChange={this.updateState} />
                    </div>
                    <div className="select">
                        <select name="Type" id="type" onChange={this.updateState}>
                            <option value="select">Select Type</option>
                            <option id='type' value="Off-roaders">Off-Roaders & Quads</option>
                            <option id='type' value="Camping">RVs and Campers</option>
                            <option id='type' value="Packages">Groups, Packages & Others</option>
                            <option id='type' value="Watercraft">Boats & Jetskis</option>
                            <option id='type' value="Experiences">Experiences</option>
                            <option id='type' value="Party">Party Equipment</option>
                            <option id='type' value="Storage-and-Transport">Storage & Transport</option>
                            <option id='type' value="Others">Other/Misc.</option>
                            {/* <option id='type' value="boats">Boat</option> */}
                        </select>
                    </div>

                    {this.switching()}






                    <Link to="/profile"><button>Cancel</button></Link>
                    {/* This button will have to insert into the sql database and then push back to the previous place */}
                    <button onClick={this.handleInsert}>Insert</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <p>Unit Name:{this.state.unit_name}</p>
                    <p>Price per day:{this.state.ppd}</p>
                    <p>Description:{this.state.description}</p>
                    <p>Contact Info:    {this.state.user.email}</p>
                    <p>User ID:         {this.state.user.id}</p>
                    <p>Type: {this.state.type}</p>
                    <p>subType: {this.state.subtype}</p>
                </div>
                <Unit handlePopUp={this.handlePopUp} type={this.state.type || 'select a type'} unit_name={this.state.unit_name || "Please Add A Name"} description={this.state.description || "There is no description."} ppd={this.state.ppd || 0} img1={this.state.img1} subtype={this.state.subtype} contact_info={this.state.contact_info || 'Contact Info'} contact_info2={this.state.contact_info2} />

                <div display={this.state.input ? "none" : "relative"} className="noInfo">
                    <h2>Please fill out all input boxes</h2>
                </div>
            </div>
        )
    }
}
export default New