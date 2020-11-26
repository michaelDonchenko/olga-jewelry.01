import React, { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/shop`)
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <FormControl
        onChange={(e) => setKeyword(e.target.value)}
        type='text'
        placeholder='Search'
        className='mr-sm-2'
        value={keyword}
      />
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}

export default Search
