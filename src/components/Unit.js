import React from 'react'
// import Button from 'styled-components'

export default function Unit(props) {


    var source = props.img1 ? props.img1 : 'http://via.placeholder.com/150x150'
    function sendEmail (unit_id){
        props.sendEmail(unit_id)
    }


    // console.log(props)
    return (

        <div className="Unit">
            <div className='imgDiv'>
                <img className='UnitImg' src={source} alt="Unit" onClick={() => props.handlePopUp(source)} />
            </div>
                {/* <div className="namePrice"> */}
            <div className='UnitContent'>
                <h2 className='unit_name'>{props.unit_name}</h2>



                <div className="infoz">
                    <div className="UNITtype">
                        <p className='unit_Type category'>{props.type}</p>
                        <p className='unitSubType category'>{props.subtype}</p>
                    </div>
                    <div className="numbers">
                        <p className='unit_zip_code'>Zip: {props.zip_code}</p>
                        <h3 className='PPD'>${props.ppd}</h3>
                    </div>
                    <br />
                    
                    <br />

                    <div className="contact-info">
                        <p className="Contact">{props.contact_info}</p>
                        <p className="Contact">{props.contact_info2}</p>
                        {/* </div> */}
                    </div>
                </div>
    


            </div>
            <div className="descDiv">
                <p className="description">{props.description}</p>
            </div>
            {props.loggedIn?<button className = 'EmailButton' onClick={()=>sendEmail(props.unit_id)}>Contact Owner</button>:null}
            {props.edit ?
                        <div className='editDiv'>
                            <button className = 'editButton' onClick={() => props.handleEdit(props.unit_id)}>Edit</button>
                            <button className = 'deleteButton'  onClick={() => props.handleDelete(props.unit_id)}>Delete</button>
                        </div> : null
                    }
        </div >
    )
}