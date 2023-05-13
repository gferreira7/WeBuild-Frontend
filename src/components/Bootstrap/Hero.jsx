import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

const Hero = ({ component, showSettings }) => {
  const { saveChanges, setContentSections } = useContext(CanvasContext)
  const { id } = useParams()

  //needed to detect clicks outside
  const wrapperRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  // saves a local copy to update and send to db laster
  const [componentData, setComponentData] = useState({
    title: component.items[0].content.title,
    subtitle: component.items[0].content.subtitle,
    primaryButton: component.items[0].content.primaryButton,
    secondaryButton: component.items[0].content.secondaryButton,
  })

  const [clickedOutside, setClickedOutside] = useState(false)

  const handleClickOutside = async (event) => {
    if (wrapperRef.current === event.target.parentNode.parentNode) {
      setIsEditing(false)
      setClickedOutside(true)
    }
  }

  useEffect(() => {
    if (clickedOutside) {
      saveChanges(id, {
        componentToEdit: { data: componentData, id: component._id },
      })
        .then((updatedWebsite) => {
          setContentSections(updatedWebsite.sections)
          setClickedOutside(false)
        })
        .catch((err) => console.log(err))
    }
  }, [clickedOutside])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDoubleClick = (e) => {
    setIsEditing(true)
  }

  const handleChange = (e) => {
    const { value, name } = e.target

    // If the name is primaryButton or secondaryButton,
    // update the corresponding button text value
    if (name === 'primaryButton') {
      setComponentData((prevValue) => ({
        ...prevValue,
        primaryButton: { ...prevValue.primaryButton, text: value },
      }))
    } else if (name === 'secondaryButton') {
      setComponentData((prevValue) => ({
        ...prevValue,
        secondaryButton: { ...prevValue.secondaryButton, text: value },
      }))
    } else {
      // Otherwise, update the regular component data
      setComponentData((prevValue) => ({ ...prevValue, [name]: value }))
    }
  }

  const style = component.style
  return (
    <div
      ref={wrapperRef}
      onClick={() => showSettings(component)}
      style={{
        ...style,
        height: `${style.height}px`,
        width: `${style.width}%`,
        backgroundColor: `${style.backgroundColor}`,
        background: `no-repeat  center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Container
        fluid='xxl'
        className='px-4 py-5'
      >
        <Row className='flex-lg-row-reverse align-items-center g-5 py-5'>
          <Col
            lg={6}
            className='text-center'
          >
            <img
              src={component.items[0].image.src}
              className='d-block mx-lg-auto img-fluid'
              alt='Bootstrap Themes'
              width={component.items[0].image.style.width}
              height={component.items[0].image.style.height}
              loading='lazy'
            />
          </Col>

          <Col lg={6}>
            {isEditing ? (
              <input
                onChange={handleChange}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                type='text'
                value={componentData.title}
                name='title'
              />
            ) : (
              <h1
                name='title-h1'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
              >
                {componentData.title}
              </h1>
            )}
            {isEditing ? (
              <input
                type='text'
                value={componentData.subtitle}
                name='subtitle'
                className='lead p-5'
                onChange={handleChange}
              />
            ) : (
              <p
                onDoubleClick={(e) => handleDoubleClick(e)}
                className='lead'
              >
                {componentData.subtitle}
              </p>
            )}
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              {isEditing ? (
                <input
                  type='text'
                  value={componentData.primaryButton.text}
                  name='primaryButton'
                  className='px-4 me-md-2'
                  onChange={handleChange}
                />
              ) : (
                <Button
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  variant={component.items[0].content.primaryButton.variant}
                  size='lg'
                  className='px-4 me-md-2'
                >
                  {componentData.primaryButton.text}
                </Button>
              )}
              {isEditing ? (
                <input
                  type='text'
                  value={componentData.secondaryButton.text}
                  name='secondaryButton'
                  className='px-4 me-md-2'
                  onChange={handleChange}
                />
              ) : (
                <Button
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  variant={component.items[0].content.secondaryButton.variant}
                  size='lg'
                  className='px-4'
                >
                  {componentData.secondaryButton.text}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
