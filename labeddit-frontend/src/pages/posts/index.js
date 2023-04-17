import { AddContentBox, FormContainer, Header, PageContainer } from "../../components"
import { goToReplyPage } from "../../routes/coordinator"
import { PostCardStyled, PostContainerStyled } from "./styled"
import { useEffect, useState } from "react"
import {FaRegCommentAlt} from "react-icons/fa"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import { getPosts, CreatePost, BASE_URL, LikePost, validateContent } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"
import axios from "axios"

export const PostsPage = () => {
    const navigate = useNavigate()

    const [form, onChangeInputs, clearInputs] = useForm({
        content: "",
    })

    const onClickLike = async (id) => {
        try{
            const body = {
                like: true
            }
            await axios.put(`${BASE_URL}/posts/${id}/like`, 
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("labeddit.token")
                } 
            })
            getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch((e)=>{
                console.log(e)
            });

        } catch (e) {
            console.log(e)
        }
    }
    const onClickDislike = async (id) => {
        try{
            const body = {
                like: false
            }
            await axios.put(`${BASE_URL}/posts/${id}/like`, 
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("labeddit.token")
                } 
            })
            getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch((e)=>{
                console.log(e)
            });

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
            clearInputs()
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
            });
    }, [])

    console.log(`repliesCount ${posts[0]}`)

    return (
        <PageContainer>
            <FormContainer>
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
                        {posts && posts.map((post, i) => (
                            <PostCardStyled key={i}>
                                <h5>{post.creator.name}</h5>
                                <h3>{post.content}</h3>
                                <Stack direction='row' spacing={0}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />}
                                    onClick={()=>{onClickLike(post.id)}}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {post.likes}
                                    </Button>
                                    <Button 
                                    type="text"
                                    leftIcon={<TbArrowBigDown />} 
                                    onClick={()=>{onClickDislike(post.id)}}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {post.dislikes}
                                    </Button>
                                    <Button 
                                        rightIcon={<FaRegCommentAlt />} 
                                        colorScheme='teal' 
                                        variant='contenReaction'
                                        onClick={()=>{goToReplyPage(navigate, post.id)}}
                                    >
                                       {post.replies} 
                                    </Button>       
                                </Stack>
                            </PostCardStyled>)
                      )}
                    </AddContentBox>
                    
                    
                </form>
            </FormContainer>
        </PageContainer>
    )
}