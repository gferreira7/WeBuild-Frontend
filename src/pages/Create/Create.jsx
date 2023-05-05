import React, { useContext, useEffect, useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import RightSideBar from '../../components/RightSideBar/RightSideBar'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { setWebSiteID, fetchOneWebsite } = useContext(CanvasContext)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setWebSiteID(id)
      fetchOneWebsite(id)
    }
  }, [id])

  return (
    <div className='create-page'>
      {showSidebar ? (
        <CanvasStore setShowSidebar={setShowSidebar} />
      ) : (
        <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
      )}
      <Canvas />

      <RightSideBar />
    </div>
  )
}

export default Create
