import { AddContentBox, Header, PageContainer } from "../../components"
import { GlobalContext } from "../../context/GlobalContext"
import { goToReplyPage } from "../../routes/coordinator"
import { PostCardStyled, PostContainerStyled } from "./styled"
import { useEffect, useState, useContext } from "react"
import {FaRegCommentAlt} from "react-icons/fa"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import { getPosts, CreatePost, LikeContent, BASE_URL } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, Stack } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../hooks/use-form"
import axios from "axios"

export const PostsPage = () => {
    const navigate = useNavigate()
    const context = useContext(GlobalContext)

    const [form, onChangeInputs] = useForm({
        content: "",
    })

    const {id} = useParams()

    const onClickLike = async () => {
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
            console.log({id})

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


    useEffect(() => {
            getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch((e)=>{
                console.log(e)
            });
            LikeContent(id)
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
                                    type="text"
                                    onClick={()=>{onClickLike()}}
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