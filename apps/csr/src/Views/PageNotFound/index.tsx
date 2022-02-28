import {Link} from 'react-router-dom'
import {BsFillArrowLeftCircleFill as BsArrow} from 'react-icons/bs'

import Layout from '~/Components/Layout'
import Button from '~/Components/Button'
import RocketAnimation from '~/Components/RocketAnimation'

function PageNotFound() {
  return (
    <Layout>
      <Link to='/'>
        <Button style={{marginBottom: '2rem'}}>
          <BsArrow/>
          <span style={{marginLeft: '0.75rem'}}>
            Back To Home
          </span>
        </Button>
      </Link>

      <section className="post-list">
        <RocketAnimation text={'Page Could Not Be Found'}/>
      </section> 
    </Layout>
  )
}

export default PageNotFound
