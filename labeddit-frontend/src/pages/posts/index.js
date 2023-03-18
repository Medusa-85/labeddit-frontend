import { AddContentBox, Header, PageContainer } from "../../components"
import { goToReplyPage } from "../../routes/coordinator"
import { PostCardStyled, PostContainerStyled } from "./styled"
import { useEffect, useState } from "react"
import {FaRegCommentAlt} from "react-icons/fa"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import { getPosts, CreatePost, LikeContent } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"

export const PostsPage = () => {
    const navigate = useNavigate()

    const [form, onChangeInputs] = useForm({
        content: "",
        likes: ""
    })

    const onClickLike = async (postId) => {
        try{
           await LikeContent()
        } catch (e) {
            console.log(e)
        }
    }

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
    const [likes, setLikes] = useState(false)


    useEffect(() => {
            getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch((e)=>{
                console.log(e)
            });
            LikeContent()
            .then(like => {
                setLikes(like)
            })
            .catch((e) =>{
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
                                <Stack direction='row' spacing={0}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {post.likes}
                                    </Button>
                                    <Button 
                                    leftIcon={<TbArrowBigDown />} 
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {post.dislikes}
                                    </Button>
                                    <Button 
                                        rightIcon={<FaRegCommentAlt />} 
                                        colorScheme='teal' 
                                        variant='contenReaction'
                                        onClick={()=>{goToReplyPage(navigate)}}
                                    >
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