import { Grid, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { PrimaryButton } from "../commom/PrimaryButton"
import { TextInput } from "../commom/TextInput"
import { DoLoginRequestDTO, DoLoginRequestSchema } from "../dto/login.dto"
import { isEmptyOrNull, mapYupErrors } from "../utils/form.utils"
import { removeSpeacialChars } from "../utils/string.utils"

export type Props = {
    setData: (data: DoLoginRequestDTO) => void
    data: DoLoginRequestDTO
    onSend: (data: DoLoginRequestDTO, setIsLoading: (value: boolean) => void) => void
}

export const useStyles = makeStyles(theme => ({
    inputRow: {
        margin: '20px 0px',
        width: '100%'
    },
}))

export function LoginForm(props: Props) {
    const classes = useStyles()
    const { data, onSend, setData } = props

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleOnChange = (name: string, value: string | number) => {
        console.log(name, value);

        if (name === 'login') {
            setData({ ...data, [name]: removeSpeacialChars(value.toString()) } as any)

        }
        else {
            setData({ ...data, [name]: value } as any)

        }
    }

    const handleError = () => {
        try {
            const result = DoLoginRequestSchema.validateSync(data, { abortEarly: false })

            setErrors({})
            setData(result)

        } catch (err) {
            setErrors(mapYupErrors(err))

        }
    }

    useEffect(() => {
        handleError()

    }, [data])

    return <>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Login"
                name="login"
                onChange={handleOnChange}
                error={data.login && errors.login}

            />

        </Grid>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Senha"
                name="password"
                onChange={handleOnChange}
                error={data.password && errors.password}
                sensitive

            />

        </Grid>
        <Grid className={classes.inputRow}>
            <PrimaryButton
                fullWidth
                onClick={() => onSend(data as DoLoginRequestDTO, setIsLoading)}
                isLoading={isLoading}
                disabled={!isEmptyOrNull(errors)}
            >
                Login
            </PrimaryButton>
        </Grid>

    </>
}
