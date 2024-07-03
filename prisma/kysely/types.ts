/* MODIFIED TO INJECT UNSUPPORTED TYPE */
import { StPoint } from './types.unsupported';
import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];
export const Channel = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  BOTH: 'BOTH',
  BRANCH: 'BRANCH',
  ONLINE_BRANCH: 'ONLINE_BRANCH',
} as const;
export type Channel = (typeof Channel)[keyof typeof Channel];
export type Category = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  name: string;
};
export type Company = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  name: string;
  logo: string;
};
export type Post = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  title: string;
  feeds: string[];
  caption: string;
  channel: Channel;
  location: StPoint;
  locationText: string | null;
  region: string | null;
  branch: string | null;
  contact: string | null;
  publishedAt: Timestamp;
  startedAt: Timestamp | null;
  endedAt: Timestamp | null;
  link: string | null;
  likes: Generated<number>;
  views: Generated<number>;
  categoryId: string;
  companyId: string;
};
export type PostToTag = {
  A: string;
  B: string;
};
export type Tag = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  name: string;
};
export type User = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  oauthId: string;
  oauthProvider: string;
  recentlyLoggedInAt: Timestamp;
  name: string | null;
  gender: Gender | null;
  email: string | null;
  tel: string | null;
  birth: Timestamp | null;
};
export type DB = {
  _PostToTag: PostToTag;
  Category: Category;
  Company: Company;
  Post: Post;
  Tag: Tag;
  User: User;
};
