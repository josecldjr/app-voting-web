import Axios from "axios";

export class HTTPService {

    private baseURl: string = 'http://localhost:3000'

    private tokenStorageKey = 'atj'

    constructor(private authToken: string | null = null) {
        const token = localStorage.getItem(this.tokenStorageKey)

        this.authToken = token || null
    }

    async setAuthToken(token: string): Promise<void> {
        localStorage.setItem(this.tokenStorageKey, token)
        this.authToken = token
    }

    async getAuthToken(): Promise<string> {
        return localStorage.getItem(this.tokenStorageKey)
    }


    getBaseUrl(): string {
        return this.baseURl
    }

    get<T>(url: string, params: { [key: string]: any } | string | Object) {
        return Axios.get<T>(url, {
            params,
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            }
        })
    }

    post<T>(url: string, body: { [key: string]: any }, aditionalHeaders: { [key: string]: any } | FormData = {}) {

        return Axios.post<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken,
                ...aditionalHeaders
            }
        })
    }

    patch<T>(url: string, body: { [key: string]: any }) {
        return Axios.patch<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.authToken
            }
        })
    }

    put<T>(url: string, body: { [key: string]: any },) {
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
