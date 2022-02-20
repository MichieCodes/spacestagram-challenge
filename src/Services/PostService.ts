import {IPost} from "../Models/IPost"
import {ILikeSet} from "../Models/ILikeSet"
import {startOfMonth} from "../Utils/GetDate"
import {sleep} from "../Utils/Sleep"

export async function fetchPosts(startDate : string = startOfMonth()) {
  await sleep(3000)

  const res = await fetch('../../../data/apod.json')
  const data : IPost[] = await res.json()

  return data
    .filter((post) => post.date >= startDate)
    .reverse()
}

export function fetchLikes() : ILikeSet {
  const likes : ILikeSet = JSON.parse(
    localStorage.getItem('spacestagram_likes') || '{}'
  )

  return likes
}

export function likePost(postID : string) : ILikeSet {
  let likes : ILikeSet = fetchLikes()

  likes[postID] = !likes[postID]

  localStorage.setItem('spacestagram_likes', JSON.stringify(likes))

  return likes
}
