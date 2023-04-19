import styled from "styled-components"

export const PageContainer = styled.div`
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF
`;

export const FormContainer = styled.div`
    //margin-top: 133px;
    min-width: 40vw;
    max-width: 98vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 10px;
    gap: 12px

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

export const AddContentBox = styled.div`
    min-width: 40vw;
    max-width: 98vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px

`