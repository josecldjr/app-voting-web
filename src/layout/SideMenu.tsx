import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import { Fab, SwipeableDrawer, List, ListItem, makeStyles, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { authService } from '../services';
import { useUserData } from '../context/context-app';

const useStyles = makeStyles({
    fab: {
        position: 'fixed',
        right: '1%',
        top: '1%',
        opacity: '.8',
    }
})
export function SideMenu() {
    const classes = useStyles()
    const [drawerMenuIsOpen, setDrawerMenuIsOpen] = useState(false)
    const [_, setUser] = useUserData()

    const items: { label: string, path: string }[] = [
        { label: 'Home', path: '/' },
        { label: 'Solicitações de usuário', path: '/access-solicitations' },
        { label: 'Votações', path: '/votations' },

    ]

    const logout = () => {
        authService.logout()
        setUser(null as any)
    }

    return <>
        <Fab
            className={classes.fab}
            color={'primary'}
        >
            <MenuIcon
                onClick={() => setDrawerMenuIsOpen(true)}
            />
        </Fab>
        <SwipeableDrawer
            open={drawerMenuIsOpen}
            onClose={() => setDrawerMenuIsOpen(false)}
            onOpen={() => { setDrawerMenuIsOpen(true) }}

        >
            <Grid>
                <Button onClick={() => logout()}>
                    Sair
                </Button>
            </Grid>
            <List>
                {
                    items.map((item, index) => <Link
                        key={index}
                        to={item.path}
                    >
                        <ListItem>
                            {item.label}
                        </ListItem>
                    </Link>)
                }
            </List>
        </SwipeableDrawer>

    </>
}