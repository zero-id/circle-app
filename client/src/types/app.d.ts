export interface IThread {
  id?: number;
  content?: string;
  userId: number;
  threadId?: number;
  image?: IThreadImage[];
  author?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  replies?: IThread[];
  like?: ILike[];
  _count?: {
    replies: number;
    like: number;
  };
}

export interface IThreadImage {
  image?: string;
}

export interface IUser {
  id?: number;
  username?: string;
  fullname?: string;
  email?: string;
  profile?: IProfile;
  _count?: {
    follower: number;
    following: number;
  };
  follower?: IFollow[];
  following?: IFollow[];
  thread?: IThread[];
  like?: ILike[];
}

export interface IFollow {
  followerId?: number;
  followingId?: number;
}

export interface ILike {
  threadId?: number;
  userId?: number;
}

export interface IProfile {
  avatar?: string;
  cover?: string;
  bio?: string;
  user: IUser;
}

export interface IFollowers {
  follower: {
    id: number;
    fullname: string;
    username: string;
    profile: {
      avatar: string;
    };
  };
}

export interface IFollowings {
  following: {
    id: number;
    fullname: string;
    username: string;
    profile: {
      avatar: string;
    };
  };
}
