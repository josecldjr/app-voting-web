


export function removeSpeacialChars(text: string) {
    let outputTxt = text

    const forbidenChars = 'áéíóúàèìòùâêîôŷûãẽĩõũ;:/\\[]{}ªº*!@#$%*()+¹²³£¢¬? °\'\"~^='

    for (let i = 0; i < outputTxt.length; i++) {

        if (forbidenChars.includes(outputTxt[i])) {
            outputTxt = outputTxt.slice(0, (i)) + outputTxt.slice(i + 1)

        }


    }

    return outputTxt
}