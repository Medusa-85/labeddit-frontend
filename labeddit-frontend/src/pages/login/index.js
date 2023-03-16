import { useForm } from "../../hooks/use-form"
import { PageContainer, FormContainer, EmailInput, PasswordInput } from '../../components'
import { Button, FormControl, FormErrorMessage, FormHelperText} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import { goToPostsPage, goToSignupPage } from "../../routes/coordinator"
import logo from "../../assets/logo2.svg"
import { Login, validateEmail, validatePassword } from '../../constants'
import { useState } from "react"

export const LoginPage = () => {

    const navigate = useNavigate()

    const [form, onChangeInputs] = useForm({
        email: "",
        password: ""
    })

    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsEmailValid(validateEmail(form.email))
        setIsPasswordValid(validatePassword(form.password))
        try{
            const { token } = isEmailValid && isPasswordValid && await Login({
                email: form.email,
                password: form.password
            })
            localStorage.setItem("labeddit.token", token)
            goToPostsPage(navigate)
        } catch (e) {
            console.log(e)
            alert(e.response.data)
        }
    }

    return (
        <PageContainer>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <img src={logo} alt="logo LabEddit"/>
                    <h2>O projeto de rede social da Labenu</h2>
                    <FormControl isInvalid={!isEmailValid}>
                        <EmailInput
                            value={form.email}
                            onChange={onChangeInputs}
                        />
                        {!isEmailValid ? (
                            <FormHelperText>
                            E-mail inválido.
                            </FormHelperText    >
                        ) : undefined }
                    </FormControl>
                    <FormControl isInvalid={!isEmailValid}>
                        <PasswordInput
                            value={form.password}
                            onChange={onChangeInputs}
                        />
                        {!isPasswordValid ? (
                            <FormHelperText>
                            Senha precisa ter pelo menos 6 caracteres.
                            </FormHelperText    >
                        ) : undefined }
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="formMain"
                        >Continuar</Button>
                    <Button 
                        type="button"
                        onClick={()=>{goToSignupPage(navigate)}}
                        variant="formSecundary"
                    >Crie uma conta</Button>
                </form>
            </FormContainer>
        </PageContainer>
    )
}