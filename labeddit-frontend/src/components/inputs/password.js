import { Input, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from "react"

export const PasswordInput = ({ value, onChange }) => {
   
    const onClickShowPassword = () => {
        setShow(!show)
    }

    const [show, setShow] = useState(false)

    return (
        <InputGroup size='md'>
            <Input
                name="password"
                value={value}
                onChange={onChange}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Senha'
            />
            <InputRightElement width='4.5rem'>
                <IconButton h='1.75rem' size='sm' onClick={onClickShowPassword}>
                {show ? <FaEyeSlash/> : <FaEye/>}
                </IconButton>
            </InputRightElement>
        </InputGroup>
    )
}