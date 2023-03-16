import styled from "styled-components"

export const PageContainer = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ca67d0
`;

export const FormContainer = styled.div`
    min-width: 40vw;
    max-width: 98vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #fbe19b;
    border-radius: 10px;
    padding: 10px;

    input {
        margin-bottom: 10px;
        background-color: #FFFFFF;
        border-radius: 4px;
        border: solid 1px #D5D8DE
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 10px;
        gap: 10px;
        padding: 10px
    }
`