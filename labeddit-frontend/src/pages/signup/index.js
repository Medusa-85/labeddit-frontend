import { useForm } from "../../hooks/use-form"
import { PageContainer, FormContainer, EmailInput, PasswordInput, NameInput, Header } from '../../components'
import { Button} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
//import { goToSignupPage } from "../../routes/coordinator"

export const SignupPage = () => {

    const navigate = useNavigate()

    const [form, onChangeInputs, clearInputs] = useForm({
        name: "",
        email: "",
        password: ""
    })

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <PageContainer>
            <Header/>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <h1>Olá, boas vindas ao LabEddit ;)</h1>
                    <NameInput
                        value={form.name}
                        onChange={onChangeInputs}
                    />
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