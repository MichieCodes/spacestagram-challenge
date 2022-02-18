import {IPost} from "../Models/IPost"
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
