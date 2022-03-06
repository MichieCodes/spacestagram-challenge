import {IPost} from '../Models/IPost';

export function getPostImage(post : IPost) : string {
  return post.media_type === 'image' ? post.url : post.thumbnail_url!
}
