import { Group, Header, MediaQuery, Burger, Text, ActionIcon } from '@mantine/core';
import React from 'react'
import { GoSignIn } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { IoLogoApple } from 'react-icons/io'

import Link from 'next/link';

import { useRecoilState, useRecoilValue } from 'recoil';
import hamburgerIcon from '../atoms/hamburgerAtom';
import login from '../atoms/loginAtom';
import signin from '../atoms/signinAtom';
import signup from '../atoms/signupAtom';
import AnchorTags from './AnchorTags';
import userid from '../atoms/userIdAtom';
import { getAuth, signOut } from 'firebase/auth';

function PageHeader() {
    const [hamburgerClicked, setHamburgerClicked] = useRecoilState(hamburgerIcon);
    const [isLoggingIn, setIsLoggingIn] = useRecoilState(login);
    const [isSigningIn, setIsSigningIn] = useRecoilState(signin);
    const [isSigningUp, setIsSigningUp] = useRecoilState(signup);
    const currentUserID = useRecoilValue(userid);
    
    const HeaderWithoutSession = () => (
        <Header height={50}>
            <Group position='apart' p={5} mr='1rem' ml='1rem'>
                <IoLogoApple size="40" color='white' />
                <Group>
                    <Text id="loginButton" size='md' weight='bolder' align='center' onClick={() => {setIsLoggingIn(true)}}>LOG IN</Text>
                </Group>
            </Group>
        </Header>
    );

    const handleSignOut = () => {
        setIsLoggingIn(false);
        setIsSigningIn(false);
        setIsSigningUp(false);

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("SIGNED OUT");
        })
    }

    const WithSessionRight = () => (
        <Group>
            <Link href="./profile">
                <ActionIcon>
                    <CgProfile color='white'/>
                </ActionIcon>
            </Link>
            <ActionIcon onClick={handleSignOut}>
                <GoSignIn color='white'/>
            </ActionIcon>
        </Group>
    );

    const HeaderWithSession = () => (
        <Header height={50}>
            <Group position='center' p={5} mr='1rem' ml='1rem'>
                <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Burger
                        opened={hamburgerClicked}
                        onClick={() => setHamburgerClicked(hamburgerClicked => !hamburgerClicked)}
                        />
                        <WithSessionRight />
                    </Group>
                </MediaQuery>
                <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                    <Group position='apart' style={{width: "100%"}}>
                        <Group><AnchorTags /></Group>
                        <WithSessionRight />
                    </Group>
                </MediaQuery>
            </Group>
        </Header>
    );

    return (
        <>{ !currentUserID ? <HeaderWithoutSession /> : <HeaderWithSession />}</>
    );
}

export default PageHeader;