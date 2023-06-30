import { Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BsFillShieldFill } from 'react-icons/bs';
import logo from '../../assets/filedriveNavicon.svg';
import { useAuth } from '../../contexts/authAPI.jsx';
import { useNavigate } from 'react-router-dom';
import Feedback from '../../components/Feedback';

import LayoutDrawer from "../../components/LayoutDrawer.jsx"

export default function NavLayout({ children }) {
  const { me } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex w={'95vw'} mx="auto" h="100vh" flexFlow={'column'}>
      <Flex w="100%" h="8%" justifyContent={'space-between'} boxShadow="lg">
        <Flex w="20%">
          <Image
            display={'none'}
            src="https://d1k5j68ob7clqb.cloudfront.net/thumb/480/processed/thumb/5qmNivrE0678IM.png"
            bg="gray.100"
            alignSelf={'center'}
            border="2px solid"
            borderColor={'border.logo'}
            mr={3}
            rounded="50%"
            width="12"
            height="12"
            objectFit={'cover'}
            cursor={"pointer"}
          />
          <Image src={logo} p={3} ml={12} />
        </Flex>
        <Flex alignItems={'center'}>
          {me.isAdmin ? (
            <Button
              leftIcon={
                <Icon
                  as={BsFillShieldFill}
                  fontSize={'2xl'}
                  color={'logo.600'}
                />
              }
              onClick={() => {
                navigate('/admin');
              }}
            >
              Admin Panel
            </Button>
          ) : (
            ''
          )}
          <Feedback me={me} />
          <LayoutDrawer/>
          {/* <ColorModeSwitcher /> */}
        </Flex> 
      </Flex>
      {/* <Flex
        display={{ base: 'flex', md: 'none' }}
        w="100vw"
        h="92%"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text>This website is temporarily only available for pc</Text>
      </Flex> */}
      {/* <Flex w="full" h="92%" display={{ base: 'none', md: 'flex' }}> */}
      <Flex w="full" h="92%">
        {children}
      </Flex>
    </Flex>
  );
}
