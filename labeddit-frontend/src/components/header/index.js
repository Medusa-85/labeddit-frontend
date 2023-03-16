import { HeaderStyled } from './styled'
import { Button } from '@chakra-ui/react'
import logo from '../../assets/logo.svg'
import { goToLoginPage } from '../../routes'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()
    return (
        <HeaderStyled>
            <p></p>
            <img src={logo}/>
            <Button onClick={() => goToLoginPage(navigate)} variant="link">Login</Button>
        </HeaderStyled>
    )
}