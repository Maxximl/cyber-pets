import { createContext } from 'react';
import { IData } from '../App';
import { Data } from '../Table/Table';

interface IContext {
    token: string | null,
    userId: string | null,
    login: (jwtTotken: any, id: any) => void,
    logout: () => void,
    isAuthentificated: boolean,
    dogs: string[],
    cats: string[],
    data: IData,
    dataset: Data[]
}

function noop() { }
export const AuthContext = createContext<IContext>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthentificated: false,
    dogs: [],
    cats: [],
    data: { tailList: [], breedList: [], shelterList: [], petColorTypes: [], petEarsTypes: [], petHairTypes: [], petSizes: [], petTypeList: [], sexTypes: [] },
    dataset: []
});