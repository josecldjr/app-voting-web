
export type YupErrorMap = {
    errors?: string[]
    inner?: {
        path?: string
        errors?: string[]
    }[]
}

/**
 * Map yup erros to a object returning it as a doctonary
 * @param error 
 */
export function mapYupErrors(error: YupErrorMap): { [errorName: string]: string } | null {
    if (error.inner) {

        const keyValue = error.inner.map(param => ({
            name: param.path || '',
            value: param.errors ? param.errors[0] : '',
        }))

        let result: { [errorName: string]: string } = {}

        keyValue.forEach(error => result[error.name] = error.value)

        return result
    }

    return null
}

/**
 * Return true if the passed argument is null, empty or a object with no keys
 * @param something 
 */
export function isEmptyOrNull(something: string | object | { [key: string]: string }): boolean {
    if (!something) {
        return true
    }

    if (typeof something !== 'string') {
        return Object.keys(something).length === 0
    }

    return true
}

/**
 * Create a false image object to be used in FormData http requests
 * @param filePath file path in mobile device storage
 * @param name file name
 * @param type type of file
 */
export function createFileObject(filePath: string, name: string, type: 'image/jpg') {
    return {
        uri: filePath,
        name,
        type,
    } as any as Blob
}

export function translateArrayToDict(textArray: string[]) {
    let dict: { [key: string]: string } = {}

    textArray.forEach((value, index) => {
        dict[index.toString()] = value
    })

    return dict
}