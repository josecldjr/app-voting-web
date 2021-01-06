import { Button, Container, Dialog, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { DoLoginRequestDTO } from "../dto/login.dto";
import { LoginForm } from "../form/LoginForm";
import { RequestLogin } from "./RequestLogin";

export function Login() {

    const [loginData, setLoginData] = useState<{} | DoLoginRequestDTO>({})
    const [showRegistrationModal, setShowregistrationModal] = useState(false)
    const onSend = (data: DoLoginRequestDTO, setIsLoading: (value: boolean) => void) => {
        setIsLoading(true)
    }

    return <Container>
        <Typography variant="h4" > Faça login</Typography>
        <LoginForm
            data={loginData}
            setData={setLoginData}
            onSend={onSend}


        />

        <Button onClick={() => {
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
