import { Input } from '@chakra-ui/react'

export const NameInput = ({ value, onChange }) => {

    return (
        <Input
            name="name"
            type='text'
            placeholder='Apelido'
            value={value}
            onChange={onChange}
        />
    )
}
