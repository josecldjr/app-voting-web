import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Dropdown } from '../commom/Dropdown'
import { PrimaryButton } from '../commom/PrimaryButton'
import { ColumnType, SimpleTable } from '../commom/table/SimpleTable'
import { useHasAdminAccess, useHasSuperAdminAccess, } from '../context/context-app'
import { ListResponseDTO } from '../dto/generic/list.dto'
import { User } from '../dto/model/user.model'
import { UserLevelTypes } from '../enum/user-permission-types.enum'
import { userService } from '../services'
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
    ]
    const [users, setUsers] = useState<ListResponseDTO<User> | null>()
    const [selectedUserId, setSelectedUserId] = useState(0)

    const renderNameRow = (name: string) => {
        return <Tooltip title={name}>
            <label>{limitString(name, { maxSize: maxNameSize })}</label>
        </Tooltip>
    }

    const renderPendingStateRow = (userId: number, value: number | string, dropDown: boolean) => {
        console.log(userId, value, dropDown);

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
                disabled={!userIsAdmin}

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
        const result = await userService.getUsersList()

        setUsers(result)

    }

    const changeUserSolicitation = async (userId: number, access: UserLevelTypes) => {
        try {
            await userService.changeUserStatus(userId, { userLevelType: access })
            setSelectedUserId(0)
            fetchUser()
        } catch {
            enqueueSnackbar('Ops! Ocorreu algum erro! Tente novamente daqui a pouco', { variant: 'error' })
        }
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
                users && <SimpleTable
                    columns={columns}
                    rows={users && users.list.sort(item => item.permissionLevel === UserLevelTypes.awaitingAproval ? -1 : 1)}
                    onRowClicked={() => {

                    }}

                />
            }
        </Grid>
        <Dialog
            open={Boolean(selectedUserId)}
            onClose={() => setSelectedUserId(0)}
        >
            <DialogTitle>
                Responder solicitação
            </DialogTitle>
            <DialogContent>
                O usuário gostaria de ter acesso ao sistema como membro, <br />
                Qual a sua resposta?

            </DialogContent>
            <DialogActions>
                <PrimaryButton
                    onClick={() => changeUserSolicitation(selectedUserId, UserLevelTypes.declined)}
                >
                    Negar
                 </PrimaryButton>
                <PrimaryButton
                    onClick={() => changeUserSolicitation(selectedUserId, UserLevelTypes.membership)}
                >
                    Aceitar
                 </PrimaryButton>
            </DialogActions>
        </Dialog>
    </Grid>
}