import {IPost} from "../Models/IPost"
import {sleep} from "../Utils/Sleep"

export function fetchPosts() : Promise<IPost[]> {
  return new Promise(async (resolve) => {
    await sleep(3000)

    resolve(
      fetch('../../../data/apod.json')
      .then((res) => res.json())
    )
  }) 
}
