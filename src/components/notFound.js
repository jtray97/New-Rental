import React from 'react'

export default function NotFound (props) {
    console.log(console.log(window.location))

    return(
        <div>
            {`page ${window.location.hash} not found`}
        </div>
    )   
}