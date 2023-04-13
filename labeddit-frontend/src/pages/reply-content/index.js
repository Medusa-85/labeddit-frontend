import { useParams } from "react-router-dom"
import { AddContentBox, FormContainer, Header, PageContainer } from "../../components"
import { PostContainerStyled, PostCardStyled } from "../posts/styled"
import { useEffect, useState } from "react"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import {FaRegCommentAlt} from "react-icons/fa"
import { BASE_URL, getPostById, getPosts, getReplies, LikePost, ReplyPost } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, FormControl, FormHelperText, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"
import axios from "axios"

export const ReplyPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [postById, setPostById] = useState([])
    const [replies, setReplies] = useState([])
    const [form, onChangeInputs] = useForm({
        reply: "",
    })


    const onClickLike = async (id) => {
        try{
            const body = {
                like: true
            }
            await axios.put(`${BASE_URL}/reply/${id}/like`, 
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("labeddit.token")
                } 
            })
            getReplies(id)
            .then(data => {
                setReplies(data)
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
            await axios.put(`${BASE_URL}/reply/${id}/like`, 
            body,
            {
                headers: {
                    Authorization: localStorage.getItem("labeddit.token")
                } 
            })
            getReplies(id)
            .then(data => {
                setReplies(data)
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
            await ReplyPost({
                reply: form.reply
            })
            getReplies(id)
            .then(data => {
                setReplies(data)
            })
            .catch((e)=>{
                console.log(e)
            })
            alert("Resposta postada com sucesso")
        } catch (e) {
            console.log(e)
            alert(e.response.data)
        }  
    }
    
    useEffect(() => {
        getPostById(id)
        .then(data => {
            setPostById(data)
        })
        .catch((e)=>{
            console.log(e)
        });
    }, []) 

    useEffect(() => {
        getReplies(id)
        .then(data => {
            setReplies(data)
        })
        .catch((e)=>{
            console.log(e)
        });
    }, [replies.length])     

   console.log(`replies ${replies[0]}`)

    return (
        <PageContainer>
            <Header/>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        {postById.map((post) => (
                            <PostCardStyled>
                                <h5>{post.creator.name}</h5>
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
                                    leftIcon={<TbArrowBigDown />}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {post.dislikes}
                                    </Button>  
                                    <Button 
                                        rightIcon={<FaRegCommentAlt />} 
                                        colorScheme='teal' 
                                        variant='contenReaction'
                                    >
                                        {replies.length}
                                    </Button>   
                                </Stack>
                            </PostCardStyled>
                        ))}
                        <ContentInput
                            value={form.reply}
                            onChange={onChangeInputs}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="formMain"
                    >
                        Responder
                    </Button>
                    {replies.map((reply, i) => (
                            <PostCardStyled key={i}>
                                <h5>{reply.creator.name}</h5>
                                <h3>{reply.reply}</h3>
                                <Stack direction='row' spacing={0}>
                                    <Button 
                                    leftIcon={<TbArrowBigUp />}
                                    onClick={()=>{onClickLike(reply.id)}}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {reply.likes}
                                    </Button>
                                    <Button 
                                    type="text"
                                    leftIcon={<TbArrowBigDown />} 
                                    onClick={()=>{onClickDislike(reply.id)}}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {reply.dislikes}
                                    </Button>
                                </Stack>
                            </PostCardStyled>)
                      )}
                </form>
            </FormContainer>
        </PageContainer>
    )
}