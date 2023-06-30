import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
 
import LottieMaking from '../../lib/LottieMaking';
import notanadmin from '../../assets/notanadmin.json';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authAPI';

export default function NotAdmin() {

  const navigate = useNavigate();
  const {logoutAPI} = useAuth();
   

  return (
    <VStack
      spacing={5}
      w="100vw"
      h="100vh"
      bg="#FF4068"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <LottieMaking animationData={notanadmin} h={550} w={600} />
      <Text color="text.dark" fontSize={'2xl'} fontWeight={'semibold'}>
        Sorry , you are not an admin !!!
      </Text>
      <hr width="70%" color="ash.500" />
      <VStack spacing={0}>
        <Text
          cursor="pointer"
          _hover={{
            color:"logo.200"
          }}
          onClick={()=>{
            navigate("/")
          }}
        >Go back to Dashboard</Text>
        <Text
          cursor="pointer"
          _hover={{
            color:"logo.200"
          }}
        onClick={async()=>{
          await logoutAPI();
        }}
        >Logout</Text>
      </VStack>
    </VStack>
  );
}
