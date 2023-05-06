import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import Button from 'react-bootstrap/Button'
import './Navbar.css'
const NavBar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        className='z-index-2'
      >
        <Container>
          <Navbar.Brand href='/'>WeBuild</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
          {isLoggedIn && (
            <Nav className='ms-auto'>
              <Navbar.Text className='me-2'>
                Signed in as: <a href='/account'>{user.name}</a>
              </Navbar.Text>

              <Button
                className='me-1'
                variant='info'
                onClick={logOutUser}
              >
                Log Out
              </Button>
              <Button
                variant='light'
                href='/premium'
              >
                Upgrade
              </Button>
            </Nav>
          )}

          {!isLoggedIn && (
            <Nav className='ms-auto'>
              <Nav.Link href='/signup'>Signup</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Button
                variant='light'
                href='/premium'
              >
                Upgrade
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
