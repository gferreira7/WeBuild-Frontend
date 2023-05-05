import { useContext } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import './NavBarDropZone.css'
import { useParams } from 'react-router-dom'
import NavBarBS from '../Bootstrap/NavBarBS'

const NavBarDropZone = () => {
  const { navbarComponents, setNavbarComponents, saveChanges } =
    useContext(CanvasContext)
  const { id } = useParams()

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NAVBAR,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      console.log(draggedComponent)
      //removing the id
      let droppedComponent = {
        type: draggedComponent.type,
        brand: draggedComponent.brand,
        name: draggedComponent.name,
        bgColor: draggedComponent.bgColor,
        navLinks: draggedComponent.navLinks,
      }

      console.log(id)
      saveChanges(id, {
        droppedComponent,
      }).then((updatedContent) => {
        setNavbarComponents(updatedContent.navbar)
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  const style = {}
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className={navbarComponents.length === 0 ? 'navbar-drop-zone' : ''}
    >
      {navbarComponents.length !== 0 ? (
        navbarComponents.map((component) => {
          return (
            <NavBarBS
              key={component._id}
              component={component}
            />
          )
        })
      ) : (
        <div>Drag a Header Item here</div>
      )}
    </div>
  )
}

export default NavBarDropZone
