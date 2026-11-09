import React from 'react'

const PosterList = (props) => {
    return (
        props.record.params.poster ? <img style={{ width: '30px', height: '30px' }} src={`/upload/${props.record.params.poster}`} /> : <p>No image</p>
    )
}
export default PosterList