import { Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { DoLoginRequestDTO } from "../dto/login.dto";
import { LoginForm } from "../form/LoginForm";

export function Login() {

    const [loginData, setLoginData] = useState<{} | DoLoginRequestDTO>({})

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


    </Container>
}
