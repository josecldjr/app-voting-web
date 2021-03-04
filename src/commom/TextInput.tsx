import { TextField } from '@material-ui/core'
import React from 'react'

export type Props = {
    label: string
    name: string
    id?: string
    onChange: (name: string, value: string | number) => void
    forceNumberConversion?: boolean
    sensitive?: boolean
    forceCase?: 'lower' | 'upper'
    fullWidth?: boolean
    error?: string
    value?: string
    type?: 'date' | 'text' | 'number'
}

export function TextInput(props: Props) {
    const {
        label,
        name,
        onChange,
        forceNumberConversion = false,
        id = name,
        sensitive = false,
        forceCase,
        fullWidth = false,
        error,
        value,
        type = 'text'
    } = props

    const handleOnChange = (name: string, _value: string | number) => {
        let value = _value

        if (forceNumberConversion) {
            value = parseFloat(_value as string)
        }

        if (forceCase && typeof _value === 'string') {
            if (forceCase === 'lower') {
                value = _value.toLowerCase()

            } else if (forceCase === 'upper') {
                value = _value.toUpperCase()

            }
        }

        onChange(name, value)
    }

    const handleType = (type: string, sensitive: boolean) => {

        if (sensitive) {
            return 'password'
        } else {
            return type
        }

    }

    return <>
        <TextField
            id={id}
            label={label}
            name={name}
            onChange={event => handleOnChange(event.target.name, event.target.value)}
            type={handleType(type, sensitive)}
            fullWidth={fullWidth}
            error={Boolean(error)}
            helperText={error}
            value={value}
        />
    </>
}
