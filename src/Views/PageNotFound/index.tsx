import {BsFillArrowLeftCircleFill as BsArrow} from 'react-icons/bs'

import Button from '../../Components/Button'
import RocketAnimation from '../../Components/RocketAnimation'

function PageNotFound() {
  return (
    <>
      <header>
        <h1>Spacetagram</h1>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </header>

      <Button style={{marginBottom: '2rem'}}>
        <BsArrow/>
        <span style={{marginLeft: '0.75rem'}}>
          Back To Home
        </span>
      </Button>

      <main>
        <section className="post-list">
          <RocketAnimation text={'Page Could Not Be Found'}/>
        </section> 
      </main>
    </>
  )
}

export default PageNotFound
