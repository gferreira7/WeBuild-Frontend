import { Accordion, Button, Card, Container, ListGroup } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { CanvasContext } from '../../context/canvas.context'
import { useLocation } from 'react-router-dom'

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {})

  return (
    <Button
      type='button'
      className='custom-toggle-button'
      onClick={decoratedOnClick}
    >
      <>{children}</>
    </Button>
  )
}

const SideMenu = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const {
    userWebsites,
    communityWebsites,
    fetchUserWebsites,
    fetchCommunityWebsites,
    fetchUserInfo,
    userPlan,
  } = useContext(CanvasContext)

  useEffect(() => {
    if (user) {
      fetchUserInfo(user._id)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUserWebsites(user._id)
    }
    fetchCommunityWebsites()
  }, [])

  return (
    <>
      <Container>
        {/* User login info/logout  */}
        <Card className='bg-dark text-white my-5 border-0'>
          <Card.Header>
            <a
              className='display-5'
              href='/'
            >
              WEBUILD
            </a>
          </Card.Header>
          <Card.Body className='custom-user-info'>
            {!isLoggedIn && (
              <div className='d-flex flex-column '>
                <Button
                  variant='secondary'
                  href='/signup'
                >
                  Signup
                </Button>
                <Button
                  variant='secondary'
                  href='/login'
                >
                  Login
                </Button>
                <Button
                  variant='light'
                  href='/premium'
                >
                  Upgrade
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <>
                {userPlan && (
                  <Card.Text>
                    Plan: <a href='/account'>{userPlan.name}</a>
                  </Card.Text>
                )}
                <Card.Text className='my-5'>
                  <span className='text-muted'>Signed in as </span>
                  <a href='/account'>{user.name}</a>
                </Card.Text>

                <Button
                  className='px-5'
                  variant='dark'
                  onClick={logOutUser}
                >
                  Log Out
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
        {isLoggedIn && (
          <Accordion>
            {/* User websites  */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='0'>My Websites</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <>
                  {userWebsites &&
                    userWebsites.length > 0 &&
                    userWebsites.map((website) => {
                      return (
                        <Card.Body
                          className='custom-sidebar-links'
                          key={website._id}
                        >
                          <div>
                            {website.name}
                          </div>
                        </Card.Body>
                      )
                    })}

                  {userWebsites.length === 0 && (
                    <Card.Body className='custom-sidebar-links'>
                      <Card.Text className='p-3'>
                        You don't have any websites
                      </Card.Text>
                      <a href='/websites'>Create One</a>
                    </Card.Body>
                  )}
                </>
              </Accordion.Collapse>
            </Card>

            {/* community websites  */}
            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='1'>Community Pages</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='1'>
                <>
                  <ListGroup>
                    {communityWebsites &&
                      communityWebsites.length > 0 &&
                      communityWebsites.map((website) => {
                        return (
                          <ListGroup.Item
                            className='custom-sidebar-links'
                            key={website._id}
                          >
                            <a
                              href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                            >
                              {website.name}
                            </a>
                          </ListGroup.Item>
                        )
                      })}
                  </ListGroup>
                </>
              </Accordion.Collapse>
            </Card>

            {/* user settings  */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='2'>User </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='2'>
                <ListGroup>
                  <ListGroup.Item className='custom-sidebar-links'>
                    Settings
                  </ListGroup.Item>
                  <ListGroup.Item className='custom-sidebar-links'>
                    Plans
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>

            {/* support  */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='3'>Support </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='3'>
                <ListGroup>
                  <ListGroup.Item className='custom-sidebar-links'>
                    Help Forum
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
            {/* Link Costumization  */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='4'>Link Costumization </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='4'>
                <ListGroup>
                  <ListGroup.Item className='custom-sidebar-links'>
                    Change Link
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>

            {/* Admin? */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='5'>Admin</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='5'>
                <ListGroup>
                  <ListGroup.Item className='custom-sidebar-links'>
                    <a href='/dashboard'> Dashboard</a>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
            {/* Products  */}

            <Card className='bg-dark border-none'>
              <Card.Header>
                <CustomToggle eventKey='6'>My Products</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey='6'>
                <ListGroup>
                  <ListGroup.Item className='custom-sidebar-links'>
                    See Products
                  </ListGroup.Item>
                  <ListGroup.Item className='custom-sidebar-links'>
                    Add New Product
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}
      </Container>
    </>
  )
}

export default SideMenu
