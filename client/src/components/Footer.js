import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container className='bg-light border border-bottom-0 mt-5'>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Sumanth Hegde</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
