import { Dialog, DialogContent, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../commom/PrimaryButton'
import { TextInput } from '../commom/TextInput'
import { SaveVotationRequestDTO, SaveVotationRequestSchema } from '../dto/save-votation.dto'
import { mapYupErrors } from '../utils/form.utils'

const styles = makeStyles({
    buttonContainer: {

    },
    inputContainer: {
        marginBottom: 15,
        marginTop: 10,
    },
    optionsContainer: {
        border: '1.5px dashed gray'
    }
})


export type Props = {
    onSubmit: (setShowModal: (value: boolean) => void) => void
    data: { [key: string]: string } | SaveVotationRequestDTO
    setData: React.Dispatch<React.SetStateAction<SaveVotationRequestDTO | { [key: string]: string }>>
    options: string[]
    setOptions: React.Dispatch<React.SetStateAction<string[]>>
}

export function CreateVotationForm({
    onSubmit,
    data,
    setData,
    options,
    setOptions,
}: Props) {
    const classes = styles()

    const [showCreationPannel, setShowCreationPannel] = useState(true)
    const [error, setError] = useState<{ [key: string]: string }>({})

    const handleChange = (name: string, value: string) => {
        const dateFieldNames = ['expirateAt', 'startTime']
        const convertToIntFields = ['minVotesCount']

        if (dateFieldNames.includes(name)) {
            setData(old => ({ ...old, [name]: moment(value).toDate().toISOString() }))

        } else if (convertToIntFields.includes(name)) {
            setData(old => ({ ...old, [name]: (parseInt(value) as any) }))

        } else {
            setData(old => ({ ...old, [name]: value }))

        }

    }

    const addOption = () => {
        const text = prompt('Digite o nome da opção')

        if (!text) {
            return
        }
        setOptions(old => [...old, text])

    }

    const removeOptionAt = (index: number) => {
        setOptions(old => old.filter((_, i) => i !== index))
    }


    const handleValidation = () => {
        try {
            setData(SaveVotationRequestSchema.validateSync(data, { abortEarly: false }))
            setError({})

        } catch (err) {
            setError(mapYupErrors(err))
        }
    }

    useEffect(() => {
        handleValidation()

    }, [data])

    return <Grid>
        <Grid className={classes.buttonContainer}>
            <PrimaryButton variant="outlined" onClick={() => {
                setShowCreationPannel(true)
            }}>
                Criar nova votação
        </PrimaryButton>
            <Dialog
                open={showCreationPannel}
                onClose={() => setShowCreationPannel(false)}
            >
                <DialogContent>

                    <Grid className={classes.inputContainer}>
                        <TextInput
                            label="Título"
                            name="title"
                            onChange={handleChange}
                            error={data.title && error.title}
                        />
                    </Grid>

                    <Grid className={classes.inputContainer}>
                        <TextInput
                            label="Descrição"
                            name="description"
                            onChange={handleChange}
                            error={data.description && error.description}
                        />
                    </Grid>

                    <Grid className={classes.optionsContainer}>
                        <Grid>
                            <Typography style={{ fontSize: 15 }}>
                                Opções
                            </Typography>
                            <PrimaryButton onClick={() => {
                                addOption()
                            }}>
                                Adicionar
                            </PrimaryButton>
                        </Grid>
                        <List>
                            {
                                options.map((text, index) => <ListItem key={index} button>
                                    <Grid>
                                        <PrimaryButton onClick={() => removeOptionAt(index)}>
                                            <Typography style={{ fontSize: 10 }}>X</Typography>
                                        </PrimaryButton>
                                    </Grid>
                                    <Grid  >
                                        <ListItemText primary={text} />
                                    </Grid>
                                </ListItem>)
                            }
                        </List>
                    </Grid>

                    <Grid className={classes.inputContainer}>
                        <TextInput
                            label="Começo da votação"
                            name="startTime"
                            onChange={handleChange}
                            error={data.expirateAt && error.expirateAt}
                            type="date"
                        />

                    </Grid>

                    <Grid className={classes.inputContainer}>
                        <TextInput
                            label="Fim da votação"
                            name="expirateAt"
                            onChange={handleChange}
                            error={data.startTime && error.startTime}
                            type="date"
                        />
                    </Grid>

                    <Grid className={classes.inputContainer}>
                        <TextInput
                            label="Mínimo de votos (opcional)"
                            name="minVotesCount"
                            type="number"
                            onChange={handleChange}
                            error={data.minVotesCount && error.minVotesCount}
                        />
                    </Grid>

                    <Grid className={classes.inputContainer}>
                        <PrimaryButton
                            onClick={() => onSubmit(setShowCreationPannel)}
                        >
                            Criar votação
                        </PrimaryButton>
                    </Grid>

                </DialogContent>

            </Dialog>
        </Grid>
    </Grid >
}