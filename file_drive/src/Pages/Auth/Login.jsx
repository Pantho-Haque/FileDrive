import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { AiFillCamera } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';
import { MdVpnKey } from 'react-icons/md';

import bolt from './../../assets/bolt.gif';
import logo from './../../assets/filedriveNavicon.svg';
import loginbackground from './../../assets/loginbackground.svg';
import { useNavigate } from 'react-router-dom';

import { getToken, setToken } from '../../lib/localstorage';
import axios from 'axios';
import { useAuth } from '../../contexts/authAPI';
import PasswordForget from '../../components/PasswordForget';

export default function Login() {
  const navigate = useNavigate();

  const { loginAPI } = useAuth();

  const [logloading, setLogloading] = useState();
  const [logData, setLogData] = useState({
    email: '',
    password: '',
  });

  const login = async () => {
    try {
      await loginAPI(logData, setLogloading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      width={'100%'}
      h={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        position="fixed"
        width={'100vw'}
        h={'100vh'}
        objectFit={'cover'}
        src={loginbackground}
        alt=""
      />

      {/* login box */}
      <Flex
        bgColor={'rgba(24, 28, 40, 0.6)'}
        width={'500px'}
        padding={10}
        pb={20}
        flexFlow={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={2}
        border={'2px solid'}
        borderColor={'logo.600'}
        rounded={10}
      >
        <IconButton
          icon={<AiFillCamera />}
          variant="solid"
          alignSelf={'end'}
          w="10"
        />

        <Image
          width="300px"
          bgColor={'transparent'}
          mb="15px"
          src={logo}
          alt=""
          srcset=""
        />
        <InputGroup mt={7}>
          <InputLeftAddon
            children={<IoMdMail />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="email"
            placeholder="Email"
            value={logData.email}
            onChange={e => {
              setLogData({ ...logData, email: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup mt={5} alignItems={'center'} fontSize={'lg'}>
          <InputLeftAddon
            children={<MdVpnKey />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="password"
            placeholder="Password"
            fontSize={'lg'}
            value={logData.password}
            onChange={e => {
              setLogData({ ...logData, password: e.target.value });
            }}
          />
        </InputGroup>

        <PasswordForget />
        <Button
          w="100%"
          my={3}
          isLoading={logloading}
          onClick={() => {
            setLogloading(true);
            setTimeout(() => {
              login();
            }, 500);
          }}
        >
          Log in
        </Button>
        <hr width="100%" />
        <Text mt={5} alignSelf={'end'}>
          Not Signed up yet?
        </Text>
        <Button
          alignSelf={'end'}
          variant={'outline'}
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
}
