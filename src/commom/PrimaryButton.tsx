import { Button } from '@material-ui/core'
import React from 'react'
import { LoadingButton } from './Loading'

export type Props = {
    children: any
    onClick: () => void
    fullWidth?: boolean
    disabled?: boolean
    isLoading?: boolean
}

export function PrimaryButton(props: Props) {
    const {
        children,
        onClick,
        fullWidth,
        disabled = false,
        isLoading,

    } = props

    return <>
        <Button
            onClick={() => onClick()}
            fullWidth
            disabled
        >
            {!isLoading ? children : <LoadingButton />}
        </Button>

    </>
}
