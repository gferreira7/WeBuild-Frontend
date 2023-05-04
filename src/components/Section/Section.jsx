import './Section.css'
import { useContext, useEffect, useState } from 'react'
import Subsection from './SubSection'
import Loading from '../Loading/Loading'
import { CanvasContext } from '../../context/canvas.context'

const Section = ({ section }) => {
  const [subsections, setSubSections] = useState(section.subsections)
  const [numberOfColumns, setNumberOfColumns] = useState(
    section.numberOfColumns
  )

  const { webSiteID, saveChanges, contentSections } = useContext(CanvasContext)
  useEffect(() => {
    setSubSections(section.subsections)
  }, [section])

  const handleSplitSections = (numberOfSubsectionsClicked) => {
    const subsectionsIncrease = numberOfSubsectionsClicked - numberOfColumns
    const sectionIndex = contentSections.findIndex(
      (sectionToFind) => sectionToFind.name === section.name
    )

    saveChanges(webSiteID, {
      subsectionsIncrease: subsectionsIncrease,
      sectionIndex: sectionIndex,
    }).then((updatedContent) => {
      console.log('number of columns from db', updatedContent.sections[2].numberOfColumns)
      // setNumberOfColumns(updatedContent.sections[sectionIndex].numberOfColumns)
    })
  }

  const style = { minHeight: '20%' }
  return (
    <div
      style={style}
      className='section'
    >
      <div className='button-wrapper'>
        <button onClick={() => handleSplitSections(1)}>1</button>
        <button onClick={() => handleSplitSections(2)}>2</button>
        <button onClick={() => handleSplitSections(3)}>3</button>
        <button>X</button>
        <button>number of subsections: {numberOfColumns}</button>
      </div>
      <div className='section-content'>
        {subsections.length > 0 ? (
          subsections.map((subsection, index) => {
            return (
              <Subsection
                key={subsection._id}
                sectionName={section.name}
                subsectionName={subsection.name}
                subsection={subsection}
              />
            )
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Section
