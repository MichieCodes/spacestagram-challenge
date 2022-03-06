import {IPost} from "../Models/IPost"
import {ILikeSet} from "../Models/ILikeSet"
import {daysSince, relativeDate, startOfMonth, today} from "../Utils/GetDate"
import {buildUrl} from "~/Utils/BuildUrl"
import {sleep} from "../Utils/Sleep"

const BASE_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true'

export async function fetchPosts(
  startDate : string = startOfMonth(),
  order : 'asc' | 'desc' = 'desc',
  endDate ?: string
) {
  const url = buildUrl(
    BASE_URL,
    ['start_date', startDate],
    !!endDate && ['end_date', endDate]
  )

  const res = await fetch(url)
  const data : IPost[] = await res.json()

  await sleep(500)

  return order === 'asc' ? data : data.reverse()
}

export async function fetchPost(date : string = today()) {
  const res = await fetch(`${BASE_URL}&date=${date}`)
  const data : IPost = await res.json()

  await sleep(1000)

  return data
}

export async function fetchNextPosts(
  startDate : string = today(),
  count : number = 10,
  order : 'asc' | 'desc' = 'desc'
) {
  startDate = order === 'desc' ? relativeDate(startDate, -count) : startDate
  const endDate = daysSince(startDate) <= count ? '' : relativeDate(startDate, count)

  const data : IPost[] = await fetchPosts(startDate, order, endDate)

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
