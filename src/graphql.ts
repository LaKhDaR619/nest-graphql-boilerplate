
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface RegisterDto {
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    password?: string;
}

export interface AuthResponse {
    access_token: string;
}

export interface IQuery {
    currentUser(): User | Promise<User>;
    users(): User[] | Promise<User[]>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    register(registerDto: RegisterDto): User | Promise<User>;
    login(loginDto: LoginDto): AuthResponse | Promise<AuthResponse>;
    update(id: string, updateUserDto: UpdateUserDto): User | Promise<User>;
    remove(id: string): User | Promise<User>;
}

export interface User {
    id: string;
    email: string;
}
