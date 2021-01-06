import Axios from "axios";

export class HTTPService {
    private storedTokenkey = 'auth-jwt-value'

    private baseURl: string = 'http://localhost:3000'

    constructor(private authToken: string | null = null) {

    }

    async setToken(token: string) {

    }

    getBaseUrl(): string {
        return this.baseURl
    }

    get<T>(url: string, params: { [key: string]: string } | string | Object) {
        return Axios.get<T>(url, {
            params,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            }
        })
    }

    post<T>(url: string, body: { [key: string]: string }, aditionalHeaders: { [key: string]: any } | FormData = {}) {

        return Axios.post<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken,
                ...aditionalHeaders
            }
        })
    }

    patch<T>(url: string, body: { [key: string]: string }) {
        return Axios.patch<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            }
        })
    }

    put<T>(url: string, body: { [key: string]: string },) {
        return Axios.put<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken,

            }
        })
    }


    delete<T>(url: string) {
        return Axios.delete<T>(url, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            },

        })
    }
}
