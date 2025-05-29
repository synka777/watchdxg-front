export interface XUser {
  id: number,
  account_id: number,
  handle: string,
  username: string,
  bio: string,
  created_at: Date,
  following_count: number,
  followers_count: number,
  featured_url: string,
  follower: boolean
}