import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'

export type Props = {
    rows: { [key: string]: any }[]
    columns: ColumnType[]
    onRowClicked: (row: { [key: string]: any }) => void
}

export type ColumnType = {
    label: string,
    key: string,
    render?: (currentRow: { [key: string]: any }, key: string, rows: { [key: string]: any }[]) => {}
}

export function SimpleTable(props: Props) {


    return <TableContainer style={{ height: 800 }}>
        <Table stickyHeader >
            <TableHead>
                <TableRow>

                    {
                        props.columns.map((col, i) => <TableCell key={i}>
                            {col.label}
                        </TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.rows.map((row, i) => <TableRow
                        key={i}
                        onClick={(row) => props.onRowClicked(row)}
                        hover
                    >
                        {
                            props.columns.map((col, i) => <TableCell key={i}>
                                {
                                    col.render ? <>{col.render(row, col.key, props.rows)}</> : row[col.key]
                                }
                            </TableCell>)
                        }
                    </TableRow>
                    )
                }
                {
                    !props.rows.length && <Grid>
                        <Typography >
                            Nada encontrado
                        </Typography>
                    </Grid>
                }
            </TableBody>
        </Table>

    </TableContainer >
}
