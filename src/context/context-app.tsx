import { createContext, useEffect, useState } from "react";
import { User } from "../dto/model/user.model";
import { authService } from "../services";

export type AppContextData = {
    isLoggedIn: boolean,
    userData: User | null
}

export type AppContextType = AppContextData & {
    setUserData: (user: User) => void
}

export const INITIAL_DATA: AppContextData = {
    isLoggedIn: false,
    userData: null,
}

export const AppContext = createContext<AppContextType>({
    isLoggedIn: false,
    userData: null,
    setUserData: () => { }
})

export const AppContextConsumer = AppContext.Consumer

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(INITIAL_DATA.userData)

    useEffect(() => {
        authService
            .getUserData().then(user => {
                if (user) {
                    setUser(user)
                }
            })


    }, [])

    return <AppContext.Provider value={{
        isLoggedIn: Boolean(user),
        userData: user,
        setUserData: setUser

    }} >
        {children}
    </AppContext.Provider>
}
