import React from 'react'
import { Label } from 'admin-bro'

const PosterShow = (props) => {
    return (
        <>
            <Label>Poster</Label>
            {props.record.params.poster ? <img style={{ width: '100px', height: '100px' }} src={`/upload/${props.record.params.poster}`} /> : <p>No image</p>}
        </>
    )
}
export default PosterShow