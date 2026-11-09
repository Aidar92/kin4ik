import React from 'react'

const AvatarList = (props) => {
    return (
        props.record.params.avatar ? <img style={{ width: '30px', height: '30px' }} src={`/upload/${props.record.params.avatar}`} /> : <p>No image</p>
    )
}
export default AvatarList