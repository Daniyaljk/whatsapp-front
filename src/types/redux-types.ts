

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
