import {IPost} from "../Models/IPost"
import {ILikeSet} from "../Models/ILikeSet"
import {startOfMonth, today} from "../Utils/GetDate"
import {sleep} from "../Utils/Sleep"

const BASE_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true'

export async function fetchPosts(startDate : string = startOfMonth()) {
  const res = await fetch(`${BASE_URL}&start_date=${startDate}`)
  const data : IPost[] = await res.json()

  await sleep(2000)

  return data.reverse()
}

export async function fetchPost(date : string = today()) {
  const res = await fetch(`${BASE_URL}&date=${date}`)
  const data : IPost = await res.json()

  await sleep(2500)

  return data
}

export function fetchLikes() : ILikeSet {
  const likes : ILikeSet = JSON.parse(
    localStorage.getItem('spacestagram_likes') || '{}'
  )

  return likes
}

export function saveLikes(likes : ILikeSet) {
  localStorage.setItem('spacestagram_likes', JSON.stringify(likes))
}
