import React, { useState, useEffect } from 'react'
import { Label } from 'admin-bro'

const CoverUpload = (props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(props.record.params.cover && `/upload/${props.record.params.cover}`)
  const [file, setFile] = useState('')
  const handleChange = e => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
      props.record.params["coverImg"] = reader.result
    }
    reader.readAsDataURL(e.target.files[0])
    setFile(e.target.files[0].name)

  }
  let imagePreview = null
  imagePreviewUrl === undefined ?
    imagePreview = (<div className={'previewText'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>Upload image for preview</div>)
    : imagePreview = (<img style={{ width: '100%', height: '200px' }} className={'previewText'} src={imagePreviewUrl} alt={'cover'} />)
  useEffect(() => {
    if (file !== "")
      props.record.params["cover"] = `${props.record.params["_id"]}_cover.${file.split('.')[file.split('.').length - 1]}`
  }, [file])
  return (
    <>
      <Label>Cover</Label>
      <input type={'text'} name={'cover'} defaultValue={file} />
      <input type="file" onChange={handleChange} />
      <div className={'imgPreview'} style={{ width: '200px', height: '200px' }}>{imagePreview}</div>
    </>
  )
}

export default CoverUpload