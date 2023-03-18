import { useParams } from "react-router-dom"
import { AddContentBox, Header, PageContainer } from "../../components"
import { PostContainerStyled, PostCardStyled } from "../posts/styled"
import { useEffect, useState } from "react"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import {FaRegCommentAlt} from "react-icons/fa"
import { ReplyContent } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const ReplyPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const [replyContents, setReplyContents] = useState([] )

    useEffect(() => {
            ReplyContent()
            .then(data => {
                setReplyContents(data)
            })
            .catch((e)=>{
                console.log(e)
            })
    }, [])

    return (
        <PageContainer>
            <PostContainerStyled>
                <Header/>
                <form onSubmit={onSubmit}>
                    <AddContentBox>
                            <PostCardStyled >
                                <h6>Autor do post</h6>
                                <h3>Conteúdo do post</h3>
                                <Stack direction='row' spacing={4}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />} 
                                    rightIcon={<TbArrowBigDown />} 
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        Likes
                                    </Button>
                                    <Button 
                                        rightIcon={<FaRegCommentAlt />} 
                                        colorScheme='teal' 
                                        variant='contenReaction'
                                    >Replies</Button>     
                                </Stack>
                            </PostCardStyled>
                        <ContentInput/>
                        <Button 
                            type="submit"
                            variant="addContent"
                            >Responder</Button>
                        {replyContents.map((content, i) => (
                            <PostCardStyled key={i}>
                                <h6>{content.creator_name}</h6>
                                <h3>{content.content}</h3>
                                <Stack direction='row' spacing={4}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />} 
                                    rightIcon={<TbArrowBigDown />} 
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {content.like}
                                    </Button>    
                                </Stack>
                            </PostCardStyled>)
                        )}
                    </AddContentBox> 
                </form>
            </PostContainerStyled>
        </PageContainer>
    )
}