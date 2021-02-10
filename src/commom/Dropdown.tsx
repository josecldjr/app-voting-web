import { InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

export type Props = {
    items: { value: string | number, label: string, disabled?: boolean }[]
    label?: string
    name: string
    id?: string
    onChange: (value: string | number, name: string) => void
    value?: string | number
    disabled?: boolean
    fullWidth?: boolean
}

export function Dropdown(props: Props) {
    const { name, id = name, label, items, onChange, value, disabled, fullWidth = true } = props

    return <>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            label={label}
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value as any, event.target.name || '')}
            disabled={disabled}
            fullWidth={fullWidth}
        >
            {
                items.map((item, index) => <MenuItem
                    key={index}
                    value={item.value}
                    selected={item.value === value}
                    disabled={item.disabled}
                > {item.label}</MenuItem>)
            }
        </Select>

    </>
}