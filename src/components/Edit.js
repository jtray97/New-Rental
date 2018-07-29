import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage'
import { GridLoader } from 'react-spinners'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Unit from './Unit'
import swal from 'sweetalert2';
class Edit extends Component {
    constructor(props) {
        super()
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
        }
    }

    componentDidMount(props) {
        console.log(this.props)
        axios.get('/api/user-data').then(response =>
            this.setState({
                user: response.data,
                unit_id: this.props.unit_id,
                unit_name: this.props.unit_name,
                ppd: this.props.ppd,
                description: this.props.description,
                zip_code: this.props.zip_code,
                type: this.props.type,
                img1: this.props.img1,
                img2: this.props.img2,
                img3: this.props.img3,
                img4: this.props.igm4,
                subtype: this.props.subtype,
                contact_info: this.props.contact_info,
                contact_info2: this.props.contact_info2

            })
        )
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
    updateState = (event) => {
        // console.log('update state')
        // console.log('id : ', event.target.id)
        // console.log('value: ', event.target.value)


        this.setState({
            [event.target.id]: event.target.value
        })
        // if(event.target.id==='type'){
        //     this.setState({
        //         subtype:''
        //     })
        // }


    }
    handleType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    handleUpdate = () => {

        // console.log(`/api/update-unit/${this.state.unit_id}`,this.state.subtype)

        axios.put(`/api/update-unit/${this.state.unit_id}`, { unit_name: this.state.unit_name, ppd: this.state.ppd, description: this.state.description, type: this.state.type, zip_code: this.state.zip_code, img1: this.state.img1, img2: this.state.img2, img3: this.state.img3, img4: this.state.img4, owner_id: this.state.user.id, subtype: this.state.subtype, contact_info: this.state.contact_info, contact_info2: this.state.contact_info2 }).then(() => {

        }).then(

            (response) => {

                swal({
                    type: "success",
                    text: "Everything was uploaded successfully!"
                })
                this.props.profileHandleUpdate()

            })
            .catch(err => {
                console.log(err)
                swal({
                    type: "error",
                    text: "Something went wrong!"
                })
            })
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
                            <option value="select">Select Sub Type</option>
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
                            <option value="select">Select Sub Type</option>
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
                            <option value="select">Select Sub Type</option>
                            <option id='subtype' value="Camping">Camping Package</option>
                            <option id='subtype' value="Watercraft">WaterSports Package</option>
                        </select>
                    </div>
                )
            case 'Watercraft':
                return (
                    <div>
                        <select name="subType" id="subType" onChange={(e) => { this.updatesubtype(e) }}>
                            <option value="select">Select Sub Type</option>

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
                            <option value="select">Select Sub Type</option>
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
                            <option value="select">Select Sub Type</option>
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
                            <option value="select">Select Sub Type</option>
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
                            <option value="select">Select Sub Type</option>
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
            .then(response => {
                this.setState({ isUploading: false, img1: url })
                // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
            })
            .catch(err => {
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
        }).then((response) => {
            const { signedRequest, url } = response.data
            this.setState({ isUploading: true })
            this.uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }

    addFile = ([file]) => {
        // const file = files[0]
        this.getSignedRequest(file)
    }
    render() {
        if (!this.state.user) {

        }
        var bigImg
        if (this.state.dispImg) {
            bigImg = <DisplayImage img={this.state.imgForDisp} closePopUp={this.closePopUp} />
        } else { bigImg = null }
        // console.log(this.props)`
        return (
            <div className="Edit">

                <div className="Slip">
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
                                float: 'Left',
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
                        {/* <input id="img1" placeholder={this.props.img1} type="text" className='imageInput' onChange={this.updateState} />
                        <input id="img2" placeholder={this.props.img2} type="text" className='imageInput' onChange={this.updateState} />
                        <input id="img3" placeholder={this.props.img3} type="text" className='imageInput' onChange={this.updateState} />
                        <input id="img4" placeholder={this.props.img4} type="text" className='imageInput' onChange={this.updateState} /> */}
                    </div>
                    <div className='UnitDesc'>
                        <input type="text" placeholder={this.props.unit_name} id='unit_name' onChange={this.updateState} />
                        <textarea type="number" placeholder={`$${this.props.ppd}`} id='ppd' maxLength="4" onChange={this.updateState} />
                        <textarea type="number" placeholder={this.props.zip_code} id='zip_code' onChange={this.updateState} maxLength='5' />
                        <textarea type="text" placeholder={this.props.contact_info} id='contact_info' onChange={this.updateState} maxLength='10' />
                        <textarea type="text" placeholder={this.props.contact_info2} id='contact_info2' onChange={this.updateState} maxLength='100' />
                        <input type="text" placeholder={this.props.description} id='description' onChange={this.updateState} />
                    </div>
                    <div className="select">
                        <select name="Type" id="type" onChange={this.updateState}>
                            <option value="select">Select Type</option>
                            <option id='type' value="Off-roaders">UTVs & Quads</option>
                            <option id='type' value="Camping">RVs and Campers</option>
                            <option id='type' value="Packages">Groups, Packages & Others</option>
                            <option id='type' value="Watercraft">Boats & Jetskis</option>
                            <option id='type' value="Experiences">Experiences</option>
                            <option id='type' value="Party">Party Equipment</option>
                            <option id='type' value="Storage-and-Transport">Storage & Transport</option>
                            <option id='type' value="Others">Other/Misc.</option>
                        </select>
                    </div>
                    {this.switching()}
                    <div className="buttonsDiv">
                        <button className='cancelButton' onClick={this.props.handleCancel}>Cancel</button>
                        <button className='updateButton' onClick={this.handleUpdate}>Update</button>
                    </div>
                </div>
                {/* <div>

                    <p>Name:{this.state.unit_name}</p>
                    <p>Price per day:{this.state.ppd}</p>
                    <p>Description:{this.state.description}</p>
                    <p>Email:    {this.state.user.email}</p>
                    <p>User ID:         {this.state.user.id}</p>
                    <p>Type : {this.state.type}</p>
                </div> */}
                <Unit type={this.state.type} unit_name={this.state.unit_name} description={this.state.description} ppd={this.state.ppd} img1={this.state.img1} editing={true} subtype={this.state.subtype} contact_info={this.state.contact_info} contact_info2={this.state.contact_info2} handlePopUp={this.handlePopUp}
                    zip_code={this.state.zip_code} />
                {bigImg}
                <div display={this.state.input ? "none" : "relative"} className="noInfo">
                    {/* <h2>Please fill out all input boxes</h2> */}
                </div>
            </div>
        )
    }
}
export default Edit