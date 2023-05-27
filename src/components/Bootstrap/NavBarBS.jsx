import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({
  showSettings,
  component: { brand, navLinks },
  component,
}) => {
  const { publicView, website, setSelectedComponent, ChangeMenu } =
    useContext(CanvasContext)

  const [isEditing, setIsEditing] = useState(false)

  const toggleSidebar = () => {
    if (!isEditing) {
      setSelectedComponent(component)
      showSettings(component)
    }
    console.log(component)
  }
  const style = component.style

  return (
    <>
      <Navbar
        expand='lg'
        className='mb-0'
        onDoubleClick={toggleSidebar}
        style={{
          ...style,
          alignItems: `${style?.alignItems || ''}`,
          height: `${style?.height || ''}px`,
          width: `${style?.width || ''}%`,
          backgroundColor: `${style.backgroundColor}`,
          padding: `${style?.padding?.top || ''}% ${
            style?.padding?.right || ''
          }% ${style?.padding?.bottom || ''}% ${style?.padding?.left || ''}%`,
          opacity: `${style.opacity}`

        }}
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              ChangeMenu(0)
            }}
          >
            {brand.text}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {navLinks &&
                navLinks.map((link, index) => (
                 <b>  <NavLink
                    className='nav-link'
                    key={link.text}
                    onClick={() => {
                      ChangeMenu(index)
                    }}
                  >
                    {link.text}
                  </NavLink>
                  </b>
                ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarBS
