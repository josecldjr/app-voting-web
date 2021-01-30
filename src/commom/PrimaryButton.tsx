import { Button } from '@material-ui/core'
import React from 'react'
import { LoadingButton } from './Loading'

export type Props = {
    children: any
    onClick: () => void
    fullWidth?: boolean
    disabled?: boolean
    isLoading?: boolean
    variant?: 'contained' | 'outlined' | 'text'
}

export function PrimaryButton(props: Props) {
    const {
        children,
        onClick,
        fullWidth = true,
        isLoading,
        variant,
    } = props

    return <>
        <Button
            onClick={() => onClick()}
            fullWidth={fullWidth}
            disabled={props.disabled}
            variant={variant}
        >
            {!isLoading ? children : <LoadingButton />}
        </Button>

    </>
}
