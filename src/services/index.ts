import { AuthService } from "./auth.service"
import { HTTPService } from "./http.service"
import { UserService } from "./user.service"
import { VotationsService } from "./votations.service"

export const httpService = new HTTPService(null)
export const authService = new AuthService(httpService)
export const votationsService = new VotationsService(httpService)
export const userService = new UserService(httpService)
