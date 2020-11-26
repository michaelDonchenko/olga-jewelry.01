import React from 'react'
import { Form } from 'react-bootstrap'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FileUpload = ({ values, setValues, setImageLoading, setImageError }) => {
  const user = useSelector((state) => state.user)

  const fileUploadAndResize = async (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files
    let allUploadedFiles = values.images

    if (files) {
      setImageLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri)
            axios
              .post(
                '/api/uploadimages',
                { image: uri },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                console.log('IMAGE UPLOAD RES DATA:', res)
                setImageLoading(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, images: allUploadedFiles })
              })
              .catch((err) => {
                console.log(err)
                setImageLoading(false)
                setImageError(err.message)
              })
          },
          'base64'
        )
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  }

  return (
    <Form>
      <Form.Group>
        <Form.File
          multiple
          accept='images/*'
          onChange={fileUploadAndResize}
          id='image'
          label='Upload Images'
        />
      </Form.Group>
    </Form>
  )
}

export default FileUpload
