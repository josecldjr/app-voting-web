import { Checkbox, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Loading } from '../commom/Loading';
import { PrimaryButton } from '../commom/PrimaryButton';
import { TextInput } from '../commom/TextInput';
import { termsOfUseLink } from '../constants/config';
import { RequestRegisterRequestDTO, RequestRegisterRequestSchema } from '../dto/request-modification.dto';
import { isEmptyOrNull, mapYupErrors } from '../utils/form.utils';
import { removeSpeacialChars } from '../utils/string.utils';

export const useStyles = makeStyles(theme => ({
    inputRow: {
        margin: '20px 0px',
        width: '100%'
    },
    disclaimer: {
        fontSize: 12,
        paddingTop: 3,
    }
}))

export type Props = {
    onSend: (data: RequestRegisterRequestDTO, setIsLoading: (value: boolean) => void) => void
    data: RequestRegisterRequestDTO
    setData: (data: any) => any
}

export function RequestLoginForm(props: Props) {
    const classes = useStyles()
    const { onSend, setData, data } = props

    const [isLoading, setIsLoading] = useState(false)

    const [accepetdTerms, setAcceptedTerms] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleOnChange = (name: string, value: string | number) => {
        if (typeof value === 'string' && !value.length) {

            setData((data: any) => {
                delete data[name]

                return { ...data }
            })

            return
        }

        if (name === 'name' || name === 'email') {
            setData((data: any) => ({ ...data, [name]: value.toString() }))
        } else {
            setData((data: any) => ({ ...data, [name]: removeSpeacialChars(value.toString()) }))
        }
    }

    const handleErrors = () => {
        try {
            const result = RequestRegisterRequestSchema.validateSync(data, { abortEarly: false })

            setErrors({})
            setData(result)

        } catch (err) {
            setErrors(mapYupErrors(err))

        }
    }

    useEffect(() => {
        handleErrors()

        console.log(data);

    }, [data])

    return <>

        <Grid className={classes.inputRow} >
            <TextInput
                label="Login*"
                name="login"
                onChange={handleOnChange}
                fullWidth
                error={data.login && errors.login}
                value={data.login}
            />
        </Grid>

        <Grid className={classes.inputRow}>
            <TextInput
                label="Nome*"
                name="name"
                onChange={handleOnChange}
                fullWidth
                error={data.name && errors.name}
                value={data.name}
            />
        </Grid>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Email (Opcional)"
                name="email"
                onChange={handleOnChange}
                fullWidth
                error={data.email && errors.email}
                value={data.email}
            />
        </Grid>
        <Grid className={classes.inputRow}>
            <TextInput
                label="Senha*"
                name="password"
                onChange={handleOnChange}
                fullWidth
                error={data.password && errors.password}
                value={data.password}
                sensitive
            />
        </Grid>

        <Grid className={classes.inputRow} style={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox
                onClick={() => setAcceptedTerms(current => !current)}
                checked={accepetdTerms}
            />
            <Typography className={classes.disclaimer}>
                Concordo e aceito os <a target="_blank" href={termsOfUseLink}> termos de uso </a>.
            </Typography>
        </Grid>
        <Grid className={classes.inputRow}>
            {
                isLoading ?
                    <Loading /> :
                    <PrimaryButton
                        fullWidth
                        onClick={() => onSend(data, setIsLoading)}
                        disabled={!accepetdTerms || !isEmptyOrNull(errors)}
                    >
                        Confirmar
                    </PrimaryButton>
            }
        </Grid>


    </>
}