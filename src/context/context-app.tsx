import { createContext } from "react";
import { User } from "../dto/model/user.model";

export type AppContextData = {
    isLoggedIn: boolean,
    loginData: User | null
}

export const INITIAL_DATA: AppContextData = {
    isLoggedIn: false,
    loginData: null,
}

export const AppContext = createContext<AppContextData>({
    isLoggedIn: false,
    loginData: null
})

export const AppContextConsumer = AppContext.Consumer
export const AppContextProvider = AppContext.Provider
