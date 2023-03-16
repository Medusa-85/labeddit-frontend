import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    components: {
        Button: {
            variants: {
                formMain: {
                    width: "100%",
                    bg: "button.gradient",
                    bgGradient: 'linear(to-r, #FF6489, #F9B24E)',
                    rounded: "27px",
                    color: "#FFFFFF",
                },
                formSecundary: {
                    width: "100%",
                    bg: "#FFFFFF",
                    border: "1px solid #FE7E02",
                    color: "#FE7E02",
                    rounded: "27px"
                }
            }
        }
    },
    colors: {
        button: {
            orange: "500"
        }
    }
})