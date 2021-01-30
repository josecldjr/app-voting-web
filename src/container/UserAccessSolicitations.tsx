import { Dialog, Grid, makeStyles, Tooltip, Typography, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ColumnType, SimpleTable } from '../commom/table/SimpleTable'
import { ListResponseDTO } from '../dto/generic/list.dto'
import { User } from '../dto/model/user.model'
import { userService } from '../services'
import { limitString } from '../utils/string.utils'
import { UserLevelTypes } from '../enum/user-permission-types.enum'
import { PrimaryButton } from '../commom/PrimaryButton'

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
                return row[key] === UserLevelTypes.awaitingAproval ? renderPendingStateRow(row['id']) : row[key]
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

    const renderPendingStateRow = (userId: number) => {
        return <Grid>
            <Grid>
                <Typography className={classes.pendinAprovalText}>
                    Aguardando
                </Typography>
            </Grid>
            <PrimaryButton
                variant="contained"
                onClick={() => {
                    setSelectedUserId(userId)
                }}

            >
                <Typography>
                    Responder
                </Typography>
            </PrimaryButton>

        </Grid>
    }

    const fetchUser = async () => {
        const result = await userService.getUsersList()

        setUsers(result)
    }

    const acceptUserSolicitation = (userId: number) => {

    }

    const denyUserSolicitation = (userId: number) => {

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
            <SimpleTable
                columns={columns}
                rows={users && users.list.sort(item => item.permissionLevel === UserLevelTypes.awaitingAproval ? -1 : 1) || []}
                onRowClicked={() => {

                }}

            />
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
                    onClick={() => acceptUserSolicitation(selectedUserId)}
                >
                    Negar
                 </PrimaryButton>
                <PrimaryButton
                    onClick={() => denyUserSolicitation(selectedUserId)}
                >
                    Aceitar
                 </PrimaryButton>
            </DialogActions>
        </Dialog>
    </Grid>
}