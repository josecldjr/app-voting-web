import { Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { ConfirmationModal } from '../commom/ConfirmationModal'
import { Dropdown } from '../commom/Dropdown'
import { Loading } from '../commom/Loading'
import { PrimaryButton } from '../commom/PrimaryButton'
import { ColumnType, SimpleTable } from '../commom/table/SimpleTable'
import { useHasAdminAccess, useHasSuperAdminAccess, useUserData } from '../context/context-app'
import { ListResponseDTO } from '../dto/generic/list.dto'
import { User } from '../dto/model/user.model'
import { UserLevelTypes } from '../enum/user-permission-types.enum'
import { authService, userService } from '../services'
import { limitString } from '../utils/string.utils'

const useStyles = makeStyles({
    pendinAprovalText: {
        fontWeight: 'bold',
        textAlign: 'center',
        border: '3px dashed #cecece',
        marginBottom: 4
    }
})

export function UserAccessSolicitaions() {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const userIsAdmin = useHasAdminAccess()
    const userIsSuperAdmin = useHasSuperAdminAccess()
    const [currentUser] = useUserData()

    const [isLoading, setIsLoading] = useState(true)


    const maxNameSize = 25
    const columns: ColumnType[] = [
        {
            key: 'name',
            label: 'Nome',
            render: (row, key) => renderNameRow(row[key])
        },
        { key: 'login', label: 'Login', },
        { key: 'email', label: 'Email', },
        {
            key: 'permissionLevel', label: 'Tipo', render: (row, key) => {
                return renderPendingStateRow(row['id'], row[key], row[key] !== UserLevelTypes.awaitingAproval)
            }
        },
        {
            key: 'id',
            label: 'Ação',
            render: (row, key) => <Grid>
                <PrimaryButton
                    onClick={() => setResetPasswordId(row['id'] as number)}
                    variant="contained"
                    disabled={
                        !userIsAdmin ||
                        row['permissionLevel'] === UserLevelTypes.superAdmin && !userIsSuperAdmin ||
                        row['id'] === currentUser.id

                    }
                >
                    Resetar senha
                </PrimaryButton>
            </Grid>
        }
    ]
    const [users, setUsers] = useState<ListResponseDTO<User> | null>()
    const [selectedUserId, setSelectedUserId] = useState(0)
    const [resetPasswordId, setResetPasswordId] = useState(0)

    const renderNameRow = (name: string) => {
        return <Tooltip title={name}>
            <label>{limitString(name, { maxSize: maxNameSize })}</label>
        </Tooltip>
    }

    const renderPendingStateRow = (userId: number, value: number | string, dropDown: boolean) => {

        return dropDown
            ? <Dropdown
                items={[
                    { value: UserLevelTypes.admin, label: 'Administrador' },
                    { value: UserLevelTypes.membership, label: 'Membro' },
                    { value: UserLevelTypes.suspended, label: 'Suspenso' },
                    { value: UserLevelTypes.declined, label: 'Negado', disabled: true },
                    { value: UserLevelTypes.superAdmin, label: 'SuperAdmin', disabled: !userIsSuperAdmin },
                    { value: UserLevelTypes.visualization, label: 'Observador' },

                ]}
                value={value}
                onChange={(value) => {
                    changeUserSolicitation(userId, value as UserLevelTypes)
                }}
                name=""
                disabled={!userIsAdmin || userId === currentUser.id || value === UserLevelTypes.superAdmin && !userIsSuperAdmin}

            />
            : <Grid>
                <Grid>
                    <Typography className={classes.pendinAprovalText}>
                        Aguardando
                    </Typography>
                </Grid>
                {
                    userIsAdmin && <PrimaryButton
                        variant="contained"
                        onClick={() => {
                            setSelectedUserId(userId)
                        }}
                    >
                        <Typography>
                            Responder
                        </Typography>
                    </PrimaryButton>
                }

            </Grid>
    }


    const fetchUser = async () => {
        setIsLoading(true)
        try {
            const result = await userService.getUsersList()

            setUsers(result)
        } catch {
            enqueueSnackbar('Ops! Ocorreu algum erro! Tente novamente daqui a pouco', { variant: 'error' })
        }
        setIsLoading(false)

    }

    const changeUserSolicitation = async (userId: number, access: UserLevelTypes) => {
        try {
            setIsLoading(true)
            await userService.changeUserStatus(userId, { userLevelType: access })
            setSelectedUserId(0)
            fetchUser()
        } catch {
            enqueueSnackbar('Ops! Ocorreu algum erro! Tente novamente daqui a pouco', { variant: 'error' })
        }

        setIsLoading(false)
    }

    const resetUserPassword = async (userId: number, newPassword: string) => {
        setIsLoading(true)

        try {
            await authService.resetPassword(userId, newPassword)
            enqueueSnackbar('A senha foi redefinida com sucesso. Informe ao usuário.', { variant: 'success' })
            enqueueSnackbar(`A nova senha do usuário é: ${newPassword}`, { variant: 'default', autoHideDuration: 15000 })
            setResetPasswordId(0)

        } catch (err) {
            enqueueSnackbar('Houve um erro ao tentar redefinir a senha! Por favor tente novamente daqui a pouco.', { variant: 'error' })

        }

        setIsLoading(false)
    }

    const generatePasswordString = (userId: number) => {
        const user = users.list.filter(user => user.id === userId)[0] || null

        if (!user) {
            enqueueSnackbar('Houve uma falha ao encontrar os dados do usuário. Tente novamente daqui a pouco', { variant: 'error' })
            fetchUser()

            setResetPasswordId(0)
            return
        }

        const randInt = () => Math.trunc(Math.random() * 10)

        const words1 = [
            'OVO',
            'PENTE',
            'TECLADO',
            'CARRO',
            'CASA',
            'MESA',
            'IGREJA',
            'CANETA',
            'TOMADA',
            'VIDRO',
        ]

        const words2 = [
            'AZUL',
            'FELIZ',
            'ESCONDIDO',
            'VERDE',
            'VERMELHO',
            'ROSA',
            'LILAZ',
            'DISTANTE',
            'BRANCO',
            'PURO',
        ]



        return words1[randInt()] + words2[randInt()]
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return <Grid>
        <Grid>
            <Typography>
                Solicitações de acesso
            </Typography>
        </Grid>
        <Grid>
            {
                isLoading && <Loading />
            }
            {
                users && <SimpleTable
                    columns={columns}
                    rows={users && users.list.sort(item => item.permissionLevel === UserLevelTypes.awaitingAproval ? -1 : 1)}
                    onRowClicked={() => {

                    }}

                />
            }
        </Grid>
        <ConfirmationModal
            open={Boolean(resetPasswordId)}
            onAccept={() => resetUserPassword(resetPasswordId, generatePasswordString(resetPasswordId))}
            onClose={() => setResetPasswordId(0)}
            title="Redefinir a senha do usuário?"
            renderContent={() => <>
                Deseja redefinir a senha do usuário?
                <br />
                <br />
                <span style={{ color: 'gray' }}>
                    A nova senha será igual os três primeiros caracteres  + os três últimos.
                </span>

            </>}

        />
        <ConfirmationModal
            open={Boolean(selectedUserId)}
            onClose={() => setSelectedUserId(0)}
            onAccept={() => changeUserSolicitation(selectedUserId, UserLevelTypes.declined)}
            onReject={() => changeUserSolicitation(selectedUserId, UserLevelTypes.membership)}
            title="Responder solicitação"
            renderContent={() => <>
                O usuário gostaria de ter acesso ao sistema como membro, <br />
                Qual a sua resposta?
            </>}
        />
    </Grid>
}