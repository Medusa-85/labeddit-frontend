import { Input } from '@chakra-ui/react'

export const ContentInput = ({ value, onChange }) => {

    return (
        <Input
            name="content"
            placeholder='Escreva seu comentário'
            value={value}
            onChange={onChange}
            htmlSize='auto' 
            width='90vw'
            height='131px'
            borderRadius='12px'
            bg='#EDEDED'
        />
    )
}