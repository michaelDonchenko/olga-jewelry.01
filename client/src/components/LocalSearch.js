import React from 'react'
import { Form } from 'react-bootstrap'

const LocalSearch = ({ keyword, setKeyword, title }) => {
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          type='search'
          placeholder='Filter'
          value={keyword}
          onChange={handleSearchChange}
          className='form-control mb-4'
        ></Form.Control>
      </Form.Group>
    </Form>
  )
}

export default LocalSearch
