export interface IUserState {
    user: {
        email: string | null;
    };
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

export interface ICredential {
    email: string;
    password: string;
}
