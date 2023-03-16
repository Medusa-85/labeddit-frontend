import { useForm } from "../../hooks/use-form"
import { PageContainer, FormContainer, EmailInput, PasswordInput, NameInput, Header } from '../../components'
import { Button, FormControl, FormHelperText} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import { validateName, validateEmail, validatePassword, Signup } from '../../constants'
import { useState } from "react"
import { goToPostsPage } from "../../routes"

export const SignupPage = () => {

    const navigate = useNavigate()

    const [form, onChangeInputs] = useForm({
        name: "",
        email: "",
        password: ""
    })

    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsNameValid(validateName(form.name))
        setIsEmailValid(validateEmail(form.email))
        setIsPasswordValid(validatePassword(form.password))
        try{
            const { token } = isNameValid && isEmailValid && isPasswordValid && await Signup({
                name: form.name,
                email: form.email,
                password: form.password
            })
            console.log(token)
            localStorage.setItem("labeddit.token", token)
            goToPostsPage(navigate)
        } catch (e) {
            console.log(e)
            alert(e.response.data)
        }
    }

    return (
        <PageContainer>
            <Header/>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <h1>Olá, boas vindas ao LabEddit ;)</h1>
                    <FormControl>
                        <NameInput
                            value={form.name}
                            onChange={onChangeInputs}
                        />
                        {!isNameValid ? (
                            <FormHelperText>
                            Apelido precisa ter pelo menos 3 caracteres.
                            </FormHelperText    >
                        ) : undefined }
                    </FormControl>
                    <EmailInput
                        value={form.email}
                        onChange={onChangeInputs}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={onChangeInputs}
                    />
                    <Button 
                        type="submit"
                        variant="formMain"
                    >
                        Cadastrar
                    </Button>
                </form>
            </FormContainer>
        </PageContainer>
    )
}