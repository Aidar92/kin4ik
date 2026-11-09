import React, { useState, useEffect } from 'react'
import { Label } from 'admin-bro'

const PosterUpload = (props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(props.record.params.poster && `/upload/${props.record.params.poster}`)
  const [file, setFile] = useState('')
  const handleChange = e => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
      props.record.params["posterImg"] = reader.result
    }
    reader.readAsDataURL(e.target.files[0])
    setFile(e.target.files[0].name)

  }
  let imagePreview = null
  imagePreviewUrl === undefined ?
    imagePreview = (<div className={'previewText'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>Upload image for preview</div>)
    : imagePreview = (<img style={{ width: '100%', height: '200px' }} className={'previewText'} src={imagePreviewUrl} alt={'poster'} />)
  useEffect(() => {
    if (file != '')
      props.record.params["poster"] = `${props.record.params["_id"]}_poster.${file.split('.')[file.split('.').length - 1]}`

  }, [file])
  return (
    <>
      <Label>Poster</Label>
      <input type={'text'} name={'poster'} defaultValue={file} />
      <input type="file" onChange={handleChange} />
      <div className={'imgPreview'} style={{ width: '200px', height: '200px' }}>{imagePreview}</div>
    </>
  )
}

export default PosterUpload