import { Container, makeStyles, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { suportEmail } from '../constants/config'
import { RequestRegisterRequestDTO } from '../dto/request-register.dto'
import { RequestLoginForm } from '../form/RequestLoginForm'
import { authService } from '../services'

const useStyles = makeStyles(theme => ({
    main: {
        padding: '30px 30px',
    },
    title: {
        padding: '20px 0px'
    },
    description: {
        fontSize: 14,


    },
    disclaimer: {
        fontSize: 10,

    }
}))
export function RequestLogin() {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const [data, setData] = useState<RequestRegisterRequestDTO>({} as any)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const onSendData = async (data: RequestRegisterRequestDTO, setIsLoading: (value: boolean) => void) => {
        setIsLoading(true)

        try {
            await authService.requestRegister(data)
            enqueueSnackbar("Cadastro feito com sucesso!", { variant: 'success', })
            setShowSuccessMessage(true)

            setTimeout(() => {
                setShowSuccessMessage(false)

            }, 30000)
        } catch (err) {
            console.log(JSON.stringify(err));
            if (err.response.data.message === 'LOGIN_ALREADY_REGISTERED') {
                enqueueSnackbar(`
                Esse login já está em uso. \n
                Procure saber se você já está registrado, ou use outro login.                
                `, { variant: 'info' })

            } else {
                enqueueSnackbar("Ops! Parece que houve um erro!", { variant: 'error' })
            }

        }

        setIsLoading(false)
    }

    return showSuccessMessage ?
        <Container>

            <Typography variant="h4" align="center" className={classes.title}>
                Cadastro completo!
            </Typography>
            <Typography variant="body1" align="center" className={classes.title}>
                Agora é só aguardar a aprovação do seu pedido.
            </Typography>
            <Typography variant="body1" align="center" className={classes.title}>
                Em breve você será notificado sobre a situação do seu cadastro!
            </Typography>

        </Container> :
        <Container className={classes.main}>

            <Typography variant="h4" align="center" className={classes.title}>
                Cadastro
            </Typography>

            <Typography variant="body1" className={classes.description}>
                O cadastro fica sujeito a aprovação dos administradores.
            </Typography>
            <Typography variant="body1" className={classes.description}>
                Isso pode levar algum tempo, tenha paciência.
            </Typography>


            <RequestLoginForm
                data={data}
                setData={setData}
                onSend={onSendData}
            />

            <Typography variant="body1" className={classes.disclaimer}>
                Caso acredite que há algum problema entre em contato através do email:
         <a href={`mailto:${suportEmail}?subject=Problema ao solicitar cadastro`} >{suportEmail}</a>
            </Typography>
        </Container>
}