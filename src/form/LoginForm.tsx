import { Button, Grid, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { PrimaryButton } from "../commom/PrimaryButton"
import { TextInput } from "../commom/TextInput"
import { DoLoginRequestDTO } from "../dto/login.dto"


export type Props = {
    setData: (data: DoLoginRequestDTO) => void
    data: DoLoginRequestDTO | {}
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
    const { data, setData, onSend } = props
    const [isLoading, setIsLoading] = useState(false)


    const handleOnChange = (name: string, value: string | number) => {
        setData({ ...data, [name]: value } as any)
    }

    return <>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Login"
                name="login"
                onChange={handleOnChange}

            />

        </Grid>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Senha"
                name="password"
                onChange={handleOnChange}
                sensitive

            />

        </Grid>
        <Grid className={classes.inputRow}>
            <PrimaryButton
                fullWidth
                onClick={() => onSend(data as DoLoginRequestDTO, setIsLoading)}
                isLoading={isLoading}
                disabled={true}
            >
                Login
            </PrimaryButton>
        </Grid>

    </>
}
