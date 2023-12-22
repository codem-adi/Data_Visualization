import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import verifyToken from "./verifyToken"

function CheckIfLogin(props) {

    const navigate = useNavigate()
    const { Component } = props
    console.log(" props ", props)
    // const [authen]
    async function authenticateMe() {
        try {
            const Token = localStorage.getItem("visualization_user_token")
            if (Token) {
                const verified = await verifyToken(JSON.parse(Token))
                if (!verified) {
                    localStorage.removeItem("visualization_user_token")
                    navigate("/login")
                } else {
                    console.log("Valid token ")
                }
            }
            else {
                console.log("Found no token ")
                navigate("/login")

            }
        } catch (error) {

        }
    }
    useEffect(() => {
        authenticateMe()
    }, [])


    return (
        <>
            <Component />
        </>
    )
}

export default CheckIfLogin