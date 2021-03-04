import { Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { SaveVotationRequestDTO } from '../dto/save-votation.dto'
import { CreateVotationForm } from '../form/CreateVotationForm'
import { votationsService } from '../services'
import { translateArrayToDict } from '../utils/form.utils'

export type Props = {
    afterCreateVotation?: () => void
}

export function CreateVotation({ afterCreateVotation = () => { } }: Props) {
    const { enqueueSnackbar } = useSnackbar()

    const [data, setData] = useState<{ [key: string]: string } | SaveVotationRequestDTO>({})
    const [options, setOptions] = useState<string[]>([])

    const onSubmit = async (setShowPannel: (value: boolean) => void) => {
        try {
            await votationsService.create({ ...data, options: translateArrayToDict(options) } as SaveVotationRequestDTO)
            enqueueSnackbar('Votação criada com sucesso', { variant: 'success' })
            setShowPannel(false)
            setData({})
            setOptions([])

        } catch (err) {
            enqueueSnackbar('Ops! Houve um erro inesperado.', { variant: 'error', })
            afterCreateVotation()

        }
    }

    return <Grid>
        <CreateVotationForm
            onSubmit={onSubmit}
            data={data}
            setData={setData}
            options={options}
            setOptions={setOptions}
        />
    </Grid>
}