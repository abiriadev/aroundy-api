import type { ColumnType } from 'kysely'
export type Generated<T> =
	T extends ColumnType<infer S, infer I, infer U>
		? ColumnType<S, I | undefined, U>
		: ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<
	Date,
	Date | string,
	Date | string
>

export type Category = {
	id: string
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	name: string
}
export type Company = {
	id: string
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	deletedAt: Timestamp | null
	name: string
	logo: string | null
}
export type like = {
	A: string
	B: string
}
export type Post = {
	id: string
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	deletedAt: Timestamp | null
	title: string
	feeds: string[]
	caption: string
	contact: string | null
	publishedAt: Timestamp
	startedAt: Timestamp | null
	endedAt: Timestamp | null
	link: string | null
	views: Generated<number>
	isOnline: boolean
	isOffline: boolean
	lat: number | null
	lng: number | null
	address1: string | null
	address2: string | null
	region: string | null
	branch: string | null
	categoryId: string
	companyId: string
}
export type PostToTag = {
	A: string
	B: string
}
export type save = {
	A: string
	B: string
}
export type Tag = {
	id: string
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	name: string
}
export type User = {
	createdAt: Generated<Timestamp>
	updatedAt: Timestamp
	deletedAt: Timestamp | null
	uid: string
	oauthProvider: string
	recentlyLoggedInAt: Timestamp
}
export type DB = {
	_Like: like
	_PostToTag: PostToTag
	_Save: save
	Category: Category
	Company: Company
	Post: Post
	Tag: Tag
	User: User
}
