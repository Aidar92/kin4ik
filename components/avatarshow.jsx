import React from 'react'
import { Label } from 'admin-bro'

const AvatarShow = (props) => {
    return (
        <>
            <Label>Avatar</Label>
            {props.record.params.avatar ? <img style={{ width: '100px', height: '100px' }} src={`/upload/${props.record.params.avatar}`} /> : <p>No image</p>}
        </>
    )
}
export default AvatarShow