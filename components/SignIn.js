import React, { useState } from 'react'
import { Button, Group, TextInput, PasswordInput, Text } from '@mantine/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GiCancel } from 'react-icons/gi'

function SignIn() {
    const [signinEmail, setSigninEmail] = useState("");
    const [signinEmailError, setSigninEmailError] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [signinPasswordError, setSigninPasswordError] = useState("");
    const auth = getAuth();

    const handleSignIn = () => {    
        signInWithEmailAndPassword(auth, signinEmail, signinPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = "/";
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === "auth/invalid-email")
                setSigninEmailError("This Email is Invalid")
            else if(errorCode === "auth/wrong-password")
                setSigninPasswordError("This Password is Wrong")
            else
                setSigninPasswordError("There is some error at this time. Please try again later.")
        });
    }

    return (
        <React.Fragment>
            <Group style={{width: "100%", height:"100%"}} position="center" p={20}>
                <form style={{width: "90%", height:"100%"}}>
                    <TextInput
                    required
                    label="Email"
                    placeholder="Your Email"
                    onChange={event => setSigninEmail(event.target.value)}
                    style={{width: "100%"}}
                    autoComplete="none"
                    />
                    {signinEmailError !== "" &&
                    <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                        {signinEmailError}
                    </Text>}

                    <PasswordInput
                    required
                    label="Password"
                    placeholder="Your Password"
                    onChange={event => setSigninPassword(event.target.value)}
                    style={{width: "100%"}}
                    autoComplete="none"
                    />
                    {signinPasswordError !== "" &&
                    <Text size='xs' style={{fontStyle: "italic"}} weight="bolder" color="red">
                        {signinPasswordError}
                    </Text>}

                    <Group direction="row" position="center" style={{width: "100%"}} py={20}>
                        <Button onClick={handleSignIn} style={{width: "46.6%"}}>Sign In</Button>
                        <Button onClick={() => window.location = "/"} style={{width: "46.6%"}}><GiCancel /></Button>
                    </Group>
                </form>
            </Group>
        </React.Fragment>
    );
}

export default SignIn;
