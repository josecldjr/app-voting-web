import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { ColumnType, SimpleTable } from "../commom/table/SimpleTable";
import { ListResponseDTO } from "../dto/generic/list.dto";
import { Votation } from "../dto/model/votation.model";
import { votationsService } from "../services";

export function Votations() {

    const columns: ColumnType[] = [
        { key: 'title', label: 'Nome', render: (row, key) => <Typography variant="overline">{row[key]}</Typography> },
        { key: 'startTime', label: 'Início', render: (row, key) => new Date(row[key]).toLocaleString() },
        { key: 'minVotesCount', label: 'Mínimo de votos', },
        { key: 'finalized', label: 'Está ativo', render: (row, key) => row[key] ? 'Sim' : 'Não' }
    ]

    const [isLoading, setIsLoading] = useState(false)

    const [votations, setVotaions] = useState<ListResponseDTO<Votation> | undefined>(undefined)
    const [activeVotations,] = useState(true)

    const fetchVotations = async () => {
        setIsLoading(true)

        try {
            const result = await votationsService.getUserVotations({ isActive: activeVotations })

            setVotaions(result)
        } catch (err) {
            alert('Erro ao buscar dados')
        }

        setIsLoading(false)
    }

    const onRowClick = (row: { [key: string]: any }) => {
        alert(row.id)
    }

    useEffect(() => {
        fetchVotations()

    }, [])


    return <div>
        Votations

        {
            isLoading ?
                'Carregando...' :
                ''
        }

        {
            votations ?
                <SimpleTable
                    columns={columns}
                    rows={votations.list}
                    onRowClicked={onRowClick}
                /> :
                <div>
                    ...
                </div>
        }
    </div>
}