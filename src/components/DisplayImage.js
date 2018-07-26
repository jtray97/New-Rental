import React from 'react'

function DisplayImage(props) {

    console.log(props)
    return (
        <div className='bigImgDivBackground' onClick={()=>{props.closePopUp()}}>
        
            <div className= 'OutsideClose'>
            </div>
            <div className="imgSize" onClick={()=>{console.log('img')}}>
                <button className='bigImgButton' onClick={props.closePopUp}>X</button>
                <img className='bigImg' src={props.img} alt="" />
            </div>
        </div>
    )
}
export default DisplayImage