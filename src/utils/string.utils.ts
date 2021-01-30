


export function removeSpeacialChars(text: string) {
    let outputTxt = text

    const forbidenChars = 'áéíóúàèìòùâêîôŷûãẽĩõũ;:/\\[]{}ªº*!@#$%*()+¹²³£¢¬? °\'"~^='

    for (let i = 0; i < outputTxt.length; i++) {

        if (forbidenChars.includes(outputTxt[i])) {
            outputTxt = outputTxt.slice(0, (i)) + outputTxt.slice(i + 1)

        }


    }

    return outputTxt
}

export function limitString(
    text: string,
    options: { maxSize?: number, postFix?: string }
) {
    const { maxSize = 25, postFix = '...' } = options
    if (text.length < maxSize) {
        return text
    }

    return text.substr(0, (maxSize - 3)) + postFix

}