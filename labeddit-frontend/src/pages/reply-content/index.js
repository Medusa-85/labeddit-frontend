import { useParams } from "react-router-dom"
import { AddContentBox, FormContainer, Header, PageContainer } from "../../components"
import { PostContainerStyled, PostCardStyled } from "../posts/styled"
import { useEffect, useState } from "react"
import {TbArrowBigUp, TbArrowBigDown} from "react-icons/tb"
import {FaRegCommentAlt} from "react-icons/fa"
import { getPostById, getPosts, getReplies, LikePost, ReplyPost } from "../../constants"
import { ContentInput } from "../../components/inputs/content"
import { Button, FormControl, FormHelperText, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/use-form"

export const ReplyPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [postById, setPostById] = useState()
    const [replies, setReplies] = useState([])
    const [form, onChangeInputs] = useForm({
        reply: "",
    })

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

    return (
        <PageContainer>
            <Header/>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <PostCardStyled>{postById[0].content}</PostCardStyled>
                        <ContentInput
                            value={form.reply}
                            onChange={onChangeInputs}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="formMain"
                    >
                        Cadastrar
                    </Button>
                </form>
            </FormContainer>
        </PageContainer>
        // <PageContainer>
        //     <PostContainerStyled>
        //         <Header/>
        //         <form onSubmit={onSubmit}>
        //             <AddContentBox>
        //                     <PostCardStyled >
        //                         <h3>Conteúdo do post</h3>
        //                         <Stack direction='row' spacing={4}>
        //                             <Button 
        //                             leftIcon={<TbArrowBigUp />} 
        //                             rightIcon={<TbArrowBigDown />} 
        //                             colorScheme='teal' 
        //                             variant='contenReaction'>
        //                                 Likes
        //                             </Button>
        //                             <Button 
        //                                 rightIcon={<FaRegCommentAlt />} 
        //                                 colorScheme='teal' 
        //                                 variant='contenReaction'
        //                             >Replies</Button>     
        //                         </Stack>
        //                     </PostCardStyled>
        //                 <ContentInput/>
        //                 <Button 
        //                     type="submit"
        //                     variant="addContent"
        //                     >Responder</Button>
        //                 {replyContents.map((content, i) => (
        //                     <PostCardStyled key={i}>
        //                         <h6>{content.creator_name}</h6>
        //                         <h3>{content.content}</h3>
        //                         <Stack direction='row' spacing={4}>
        //                             <Button 
        //                             leftIcon={<TbArrowBigUp />} 
        //                             rightIcon={<TbArrowBigDown />} 
        //                             colorScheme='teal' 
        //                             variant='contenReaction'>
        //                                 {content.like}
        //                             </Button>    
        //                         </Stack>
        //                     </PostCardStyled>)
        //                 )}
        //             </AddContentBox> 
        //         </form>
        //     </PostContainerStyled>
        // </PageContainer>
    )
}