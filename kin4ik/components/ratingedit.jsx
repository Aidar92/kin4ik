import React, { useState } from 'react'
import { Label } from 'admin-bro'
const RatingEdit = (props) => {
    const [rating, setRating] = useState(0)
    const handleInput = e => setRating(e.target.value)
    return (
        <>
            <Label>Rating</Label>
            <input id={'ratingIn'} name={'rating'} type='range' min='0' max='5' step='0.5' onInput={handleInput} defaultValue='0' />
            <output id={'ratingOut'}>{rating}</output>
        </>)
}

export default RatingEdit