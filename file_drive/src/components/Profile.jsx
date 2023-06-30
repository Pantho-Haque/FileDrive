import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { AiOutlineUser } from 'react-icons/ai';
import { BsShieldLockFill, BsUnlockFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import { useAuth } from '../contexts/authAPI';

export default function Profile({ me }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { logoutAPI, updatenameemailAPI, changepassAPI } = useAuth();

  const [newData, setNewData] = useState({
    name: me.name,
    email: me.email,
  });

  const [changepass, setChangepass] = useState({
    prevPass: '',
    password: '',
    password_confirmation: '',
  });

  const [loggingout, setLoggingout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const updateinfo = async () => {
    try {
      await updatenameemailAPI(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async () => {
    try {
      await changepassAPI(changepass);

      document.getElementById('prevPass').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password_confirmation').value = '';

      setChangepass({
        prevPass: '',
        password: '',
        password_confirmation: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI(setLogoutLoading);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="full">
      <Button w="full" justifyContent="flex-start" onClick={onOpen}>
        <Icon w={8} h={8} mr={3} as={AiOutlineUser} />
        Profile
      </Button> 

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Flex flexFlow={'column'} w="70%" mx="auto">
              <InputGroup mt={7}>
                <InputLeftAddon
                  rounded={'none'}
                  children={<MdAccountCircle />}
                  color="ash.300"
                  fontSize={'2xl'}
                />
                <Input
                  rounded={'none'}
                  type="email"
                  placeholder="Email"
                  value={newData.name}
                  onChange={e => {
                    setNewData({ ...newData, name: e.target.value });
                  }}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon
                  rounded={'none'}
                  children={<IoMdMail />}
                  color="ash.300"
                  fontSize={'2xl'}
                />
                <Input
                  rounded={'none'}
                  type="email"
                  placeholder="Email"
                  value={newData.email}
                  onChange={e => {
                    setNewData({ ...newData, email: e.target.value });
                  }}
                />
              </InputGroup>
              <Button
                isDisabled={
                  newData.name === me.name && newData.email === me.email
                }
                roundedTop={'none'}
                mt={1}
                onClick={updateinfo}
              >
                Update
              </Button>
            </Flex>

            <Flex flexFlow={'column'} alignItems={'end'} w="70%" mx="auto">
              <InputGroup mt={7}>
                <InputLeftAddon
                  children={<BsUnlockFill />}
                  color="ash.300"
                  fontSize={'2xl'}
                />
                <Input
                  type="password"
                  id="prevPass"
                  placeholder="Current Password"
                  onChange={e => {
                    setChangepass({ ...changepass, prevPass: e.target.value });
                  }}
                />
              </InputGroup>
              <InputGroup mt={3}>
                <InputLeftAddon
                  children={<BsShieldLockFill />}
                  color="ash.300"
                  fontSize={'2xl'}
                />
                <Input
                  type="password"
                  id="password"
                  placeholder="New Password"
                  onChange={e => {
                    setChangepass({ ...changepass, password: e.target.value });
                  }}
                />
              </InputGroup>
              <InputGroup mt={3}>
                <InputLeftAddon
                  children={<BsShieldLockFill />}
                  color="ash.300"
                  fontSize={'2xl'}
                />
                <Input
                  type="password"
                  id="password_confirmation"
                  placeholder="Retype New Password"
                  onChange={e => {
                    setChangepass({
                      ...changepass,
                      password_confirmation: e.target.value,
                    });
                  }}
                />
              </InputGroup>
              <Button justifySelf={'end'} mt={1} onClick={changePassword}>
                Change Password
              </Button>
            </Flex>

            {!loggingout ? (
              <Button
                mt={5}
                color="text.light"
                bg="tomato.500"
                _hover={{
                  bg: 'tomato.700',
                }}
                w="full"
                onClick={() => setLoggingout(true)}
              >
                Logout
              </Button>
            ) : (
              <Flex
                flexFlow={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                my={5}
                p={3}
                border="2px dashed"
                borderColor={'border.light'}
              >
                <Text>Are you sure ?</Text>
                <Flex my={3} w="50%" justifyContent={'space-around'}>
                  <Button
                    w="30%"
                    color="text.light"
                    bg="tomato.500"
                    _hover={{
                      bg: 'tomato.700',
                    }}
                    isLoading={logoutLoading}
                    onClick={() => {
                      setLogoutLoading(true);
                      setTimeout(() => {
                        logout();
                      }, 500);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    w="30%"
                    color="text.light"
                    bg="tomato.500"
                    _hover={{
                      bg: 'tomato.700',
                    }}
                    onClick={() => setLoggingout(false)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
