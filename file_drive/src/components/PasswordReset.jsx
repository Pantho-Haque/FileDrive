import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdVpnKey } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authAPI';

export default function PasswordReset() {
  const { token } = useParams();
  const { resetPasswordAPI } = useAuth();
    const navigate=useNavigate();

  const [pass, setPass] = useState({ 
    token: token,
    password: '',
    password_confirmation: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const gotoLogin=()=>{
    navigate("/login")
  }

  
  const resetPassword = async () => {
    try {
      await resetPasswordAPI(pass, setSubmitting,gotoLogin);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      pt={20}
      justifyContent={'center'}
      alignItems={'start'}
    >
      {/* PasswordReset
      {token} */}
      <Flex flexFlow={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text> Put you new password that propects your account</Text>
        <InputGroup mt={5} alignItems={'center'} fontSize={'lg'}>
          <InputLeftAddon
            children={<MdVpnKey />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="password"
            placeholder="New Password"
            fontSize={'lg'}
            value={pass.password}
            onChange={e => {
              setPass({ ...pass, password: e.target.value });
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
            placeholder="Re-type New Password"
            fontSize={'lg'}
            value={pass.password_confirmation}
            onChange={e => {
              setPass({ ...pass, password_confirmation: e.target.value });
            }}
          />
        </InputGroup>
        <Button
          mt={10}
          alignSelf={'end'}
          isLoading={submitting}
          onClick={() => {
            setSubmitting(true);
            setTimeout(() => {
              resetPassword();
            }, 500);
          }}
        >
          {' '}
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
