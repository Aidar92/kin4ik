import React from 'react'
import { Label } from 'admin-bro'

const CoverShow = (props) => {
    return (
        <>
            <Label>Cover</Label>
            {props.record.params.cover ? <img style={{ width: '100px', height: '100px' }} src={`/upload/${props.record.params.cover}`} /> : <p>No image</p>}
        </>
    )
}
export default CoverShow