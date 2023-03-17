import { AddContentBox, Header, PageContainer } from "../../components"
import { goToReplyContentPage } from "../../routes/coordinator"
import { PostCardStyled, PostContainerStyled } from "./styled"
import { useEffect, useState } from "react"
import {FaRegCommentAlt} from "react-icons/fa"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import { Posts } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const PostsPage = () => {
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const [posts, setPosts] = useState([])

    useEffect(() => {
            Posts()
            .then(data => {
                setPosts(data)
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
                        <ContentInput/>
                        <Button 
                            type="submit"
                            variant="addContent"
                            >Postar</Button>
                        {posts.map((post, i) => (
                            <PostCardStyled key={i}>
                                <h3>{post.content}</h3>
                                <Stack direction='row' spacing={4}>
                                    <Button leftIcon={<TbArrowBigUp />} rightIcon={<TbArrowBigDown />} colorScheme='teal' variant='contenReaction'>
                                        {post.like}
                                    </Button>
                                    <Button 
                                        rightIcon={<FaRegCommentAlt />} 
                                        colorScheme='teal' 
                                        variant='contenReaction'
                                        onClick={()=>{goToReplyContentPage(navigate)}}
                                    >
                                        Endpoint reply-content
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