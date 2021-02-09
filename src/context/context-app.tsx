import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../dto/model/user.model";
import { UserLevelTypes } from "../enum/user-permission-types.enum";
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


export const useIsLoggedIn = () => {
    const { isLoggedIn } = useContext<AppContextType>(AppContext)

    return isLoggedIn
}

export const useUserData = (): [User | null, (value: User | null) => void] => {
    const { userData, setUserData } = useContext<AppContextType>(AppContext)

    return [userData, setUserData]
}

export const useUserAccessLevel = () => {
    const { userData } = useContext<AppContextType>(AppContext)

    return userData.permissionLevel
}

export const useHasAdminAccess = () => {
    const { userData } = useContext<AppContextType>(AppContext)

    return userData.permissionLevel === UserLevelTypes.admin || userData.permissionLevel === UserLevelTypes.superAdmin
}

export const useHasSuperAdminAccess = () => {
    const { userData } = useContext<AppContextType>(AppContext)

    return userData.permissionLevel === UserLevelTypes.superAdmin
}

