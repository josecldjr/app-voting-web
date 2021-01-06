import { AuthService } from "./auth.service"
import { HTTPService } from "./http.service"

export const httpService = new HTTPService(null)
export const authService = new AuthService(httpService)
