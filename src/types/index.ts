export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
}

export interface IUserState {
    user: null | IUser;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}
