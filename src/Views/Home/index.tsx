import Layout from '~/Components/Layout'
import DatePicker from '~/Components/DatePicker'
import PostList from '~/Components/PostList'

function Home() {
  return (
    <Layout>
      <DatePicker/>
      <PostList/>
    </Layout>
  )
}

export default Home
