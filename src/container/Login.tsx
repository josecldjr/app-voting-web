import { Button, Container, Dialog, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { AppContext, AppContextType } from "../context/context-app";
import { DoLoginRequestDTO } from "../dto/login.dto";
import { LoginForm } from "../form/LoginForm";
import { authService } from "../services";
import { RequestLogin } from "./RequestLogin";

export function Login() {
    const { enqueueSnackbar } = useSnackbar()
    const { setUserData } = useContext<AppContextType>(AppContext)

    const [loginData, setLoginData] = useState<DoLoginRequestDTO>({} as any)
    const [showRegistrationModal, setShowregistrationModal] = useState(false)

    const [isDoingLogin, setIsDoingLogin] = useState(false)

    const onSend = async (data: DoLoginRequestDTO, setIsLoading: (value: boolean) => void) => {
        setIsDoingLogin(true)
        setIsLoading(true)

        setTimeout(async () => {

            try {
                const result = await authService.doLogin(data)
                setUserData(result.user)
                console.log(result);

            } catch (err) {
                handleLoginError(err.response.data.message)
            }


            setIsLoading(false)
            setIsDoingLogin(false)


        }, 1000)
    }

    const handleLoginError = (message: string) => {

        switch (message) {
            case 'USER_NOT_EXIST':
                enqueueSnackbar('Nome de login não existe', { variant: 'error', })
                break;
            case 'THIS_USER_WAS_DECLINED':
                enqueueSnackbar('Esse usuário teve o registro recusado', { variant: 'error', })

                break;
            case 'USER_IS_SUSPENDED':
                enqueueSnackbar('Esse usuário está atualmente suspenso', { variant: 'warning', })

                break;
            case 'USER_AWAITING_APROVAL':
                enqueueSnackbar('Esse usuário ainda está aguardando a aprovação', { variant: 'info', })

                break;
            case 'WRONG_PASSWORD':
                enqueueSnackbar('usuário ou senha estão errados', { variant: 'info', })

                break;
            default:
                enqueueSnackbar('Ops! Algo de errrado não está certo.', { variant: 'info' })

                break;
        }
    }

    return <Container>
        <Typography variant="h4" > Faça login</Typography>
        <LoginForm
            data={loginData}
            setData={setLoginData}
            onSend={onSend}
        />

        <Button
            disabled={isDoingLogin}
            onClick={() => {
                setShowregistrationModal(true)

            }}>
            Registrar
        </Button>

        <Dialog
            open={showRegistrationModal}
            onClose={() => setShowregistrationModal(false)}
        >
            <RequestLogin />
        </Dialog>

    </Container>
}
