

export interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    token: string;
}

export interface RootState {
    user: {
        status: string;
        error: string;
        user: User;
    };
}

export interface registerUserValue{
    name : string,
    email : string,
    password : string,
    picture ?: string,
}
