import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { PrimaryButton } from './PrimaryButton'

export type Props = {
    open: boolean
    onClose: () => void
    onAccept: () => void
    onReject?: () => void
    renderContent: () => any
    title: string
}

export function ConfirmationModal(props: Props) {
    return <Dialog
        open={props.open}
        onClose={props.onClose}
    >
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            {props.renderContent()}

        </DialogContent>
        <DialogActions>
            <PrimaryButton
                onClick={props.onReject || props.onClose}
            >
                Negar
         </PrimaryButton>
            <PrimaryButton
                onClick={props.onAccept}
            >
                Aceitar
         </PrimaryButton>
        </DialogActions>
    </Dialog>
}
