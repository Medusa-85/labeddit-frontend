import { AddContentBox, Header, PageContainer } from "../../components"
import { goToReplyContentPage } from "../../routes/coordinator"
import { PostCardStyled, PostContainerStyled } from "./styled"
import { useEffect, useState } from "react"
import {FaRegCommentAlt} from "react-icons/fa"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import { getPosts, CreatePost } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"

export const PostsPage = () => {
    const navigate = useNavigate()

    const [form, onChangeInputs] = useForm({
        content: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            await CreatePost({
                content: form.content
            })
            getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch((e)=>{
                console.log(e)
            })
            alert("Comentário postado com sucesso")
        } catch (e) {
            console.log(e)
            alert(e.response.data)
        }      
    }

    const [posts, setPosts] = useState([])


    useEffect(() => {
            getPosts()
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
                        <ContentInput
                            value={form.content}
                            onChange={onChangeInputs}
                        />
                        <Button 
                            type="submit"
                            variant="addContent"
                            >Postar</Button>
                        {posts.map((post, i) => (
                            <PostCardStyled key={i}>
                                <h3>{post.content}</h3>
                                <Stack direction='row' spacing={4}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />} 
                                    rightIcon={<TbArrowBigDown />} 
                                    colorScheme='teal' 
                                    variant='contenReaction'>
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