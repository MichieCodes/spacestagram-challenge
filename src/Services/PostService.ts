import {IPost} from "../Models/IPost"
import {sleep} from "../Utils/Sleep"

export function fetchPosts() : Promise<IPost[]> {
  return new Promise(async (resolve) => {
    await sleep(3000)

    const res = await fetch('../../../data/apod.json')
    const data : IPost[] = await res.json()

    resolve(data.reverse())
  }) 
}
