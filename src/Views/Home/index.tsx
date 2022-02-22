import DatePicker from '../../Components/DatePicker'
import PostList from '../../Components/PostList'

function Home() {
  return (
    <>
      <header>
        <h1>Spacetagram</h1>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </header>

      <DatePicker/>

      <main>
        <PostList/>
      </main>
    </>
  )
}

export default Home
