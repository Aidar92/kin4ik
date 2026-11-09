import React from 'react'

const CoverList = (props) => {
    return (
        props.record.params.cover ? <img style={{ width: '30px', height: '30px' }} src={`/upload/${props.record.params.cover}`} /> : <p>No image</p>
    )
}
export default CoverList