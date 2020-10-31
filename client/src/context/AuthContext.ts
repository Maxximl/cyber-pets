import { createContext } from 'react';

interface IContext {
    token: string | null,
    userId: string | null,
    login: (jwtTotken: any, id: any) => void,
    logout: () => void,
    isAuthentificated: boolean,
    dogs: string[],
    cats: string[]
}

function noop() { }
export const AuthContext = createContext<IContext>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthentificated: false,
    dogs: [],
    cats: []
});