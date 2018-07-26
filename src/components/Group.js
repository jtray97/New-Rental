import React from 'react'


// import AllUnits from './AllUnits'
export default function Group (props) {
    // this.changeClick = this.changeClick.bind(this)
    // var changeClick = () =>{
    //     console.log(props.name, props.location)
    //     // props.history.push(`/${props.location}`)
    // }
    return(

        <div className="Group">
            <h1>{props.name}</h1>
        </div>
    )
}