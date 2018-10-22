import React from 'react'
import GoBack from './GoBack'
export default function NotFound (props) {
    console.log(console.log(window.location))

    return(
        <div>
            <GoBack/>
            {`page ${window.location.hash} not found`}
        </div>
    )   
}