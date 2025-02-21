export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface SelectUser {
    name: string;
    value: string|number;
}