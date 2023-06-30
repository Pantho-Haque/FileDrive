import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authAPI';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function Emailverified() {
  const { token } = useParams();
  const navigate=useNavigate();

  const { emailverificationAPI } = useAuth();

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetching = async () => {
      let msg = await emailverificationAPI(token);
      setMessage(msg);
    };
    fetching();
  }, []);

  return (
    <Flex
      w="100vw"
      h="100vh"
      bg="bg.dark"
      justifyContent={'center'}
      alignItems={'center'}
      flexFlow={"column"}
    >
      <Text color="text.light">{message}</Text>
      <Button mt={5} 
        onClick={()=>{
          navigate("/login")
        }}
      >Go to Login</Button>
    </Flex>
  );
}
