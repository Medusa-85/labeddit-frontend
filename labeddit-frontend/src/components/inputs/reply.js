import { Input } from '@chakra-ui/react'

export const ReplyInput = ({ value, onChange }) => {

    return (
        <Input
            name="reply"
            placeholder='Escreva seu comentário'
            value={value}
            onChange={onChange}
            htmlSize='auto' 
            width='80vw'
            height='131px'
            borderRadius='12px'
            bg='#EDEDED'
        />
    )
}