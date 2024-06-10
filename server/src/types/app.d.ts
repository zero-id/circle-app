export interface IRegister {
  username: string;
  password: string;
  email: string;
  fullname: string;
}

export interface IAuthMiddleware {
  id: number;
}

export interface IProfile {
  userId?: number;
  avatar?: string;
  cover?: string;
  bio?: string;
}

export interface IThread {
  id?: number;
  content?: string;
  userId: number;
  threadId?: number;
}


