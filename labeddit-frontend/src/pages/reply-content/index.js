import { useParams } from "react-router-dom"
import { AddContentBox, FormContainer, Header, PageContainer } from "../../components"
import { PostContainerStyled, PostCardStyled } from "../posts/styled"
import { useEffect, useState } from "react"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import {FaRegCommentAlt} from "react-icons/fa"
import { BASE_URL, getPostById, getPosts, getReplies, LikePost, ReplyPost, validateReply } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, FormControl, FormHelperText, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"
import axios from "axios"
import { ReplyInput } from "../../components/inputs/reply"

export const ReplyPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [postById, setPostById] = useState([])
    const [replies, setReplies] = useState([])

    const [form, onChangeInputs, clearInputs] = useForm({
        reply: ""
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
            await ReplyPost(
                id, {
                reply: form.reply
            })
            .then(data => {
                setReplies(data)
            })
            .catch((e)=>{
                console.log(e)
            })
            getReplies(id)
            .then(data => {
                setReplies(data)
            })
            .catch((e)=>{
                console.log(e)
            });
            clearInputs()
            alert("Resposta postada com sucesso")
            console.log(replies)
        } catch (e) {
            console.log(e)
            alert(e.response.data)
        }  
    }

    console.log(`replies ${replies.length}`)
    
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
                        <ReplyInput
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
                    {replies && replies.map((reply) => {
                            return <PostCardStyled key={reply.id}>
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
                                    leftIcon={<TbArrowBigDown />} 
                                    onClick={()=>{onClickDislike(reply.id)}}
                                    colorScheme='teal' 
                                    variant='contenReaction'>
                                        {reply.dislikes}
                                    </Button>
                                </Stack>
                            </PostCardStyled>}
                      )}
                </form>
            </FormContainer>
        </PageContainer>
    )
}