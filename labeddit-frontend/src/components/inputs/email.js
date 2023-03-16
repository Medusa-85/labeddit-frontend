import { Input } from '@chakra-ui/react'

export const EmailInput = ({ value, onChange }) => {

    return (
        <Input
            name="email"
            placeholder='E-mail'
            value={value}
            onChange={onChange}
        />
    )
}

