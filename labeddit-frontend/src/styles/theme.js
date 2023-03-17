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
                },
                addContent: {
                    width: "100%",
                    bg: "button.gradient",
                    bgGradient: 'linear(to-r, #FF6489, #F9B24E)',
                    rounded: "12px",
                    color: "#FFFFFF",
                },
                contentReaction: {
                    width: "25px",
                    bg: "none",
                    border: "1px solid #E0E0E0",
                    bg: "#FE7E02"
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