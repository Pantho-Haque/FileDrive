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
import { IoMdMail } from 'react-icons/io';
import { MdSend } from 'react-icons/md';
import { useAuth } from '../contexts/authAPI';
export default function PasswordForget() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { sendemailtoresetAPI } = useAuth();

  const [email, setEmail] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);

  const sendingEmail = async () => {
    try {
      await sendemailtoresetAPI({ email: email },setLoadingBtn);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="full">
      <Text
        textAlign={'end'}
        px={5}
        pt={3}
        cursor="pointer"
        _hover={{
          color: 'logo.500',
        }}
        onClick={onOpen}
      >
        forget password
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Text>A verification emai will be sent</Text>
            <Text>so that you can reset your password</Text>
            <InputGroup mt={5} alignItems={'center'} fontSize={'lg'}>
              <InputLeftAddon
                children={<IoMdMail />}
                color="ash.300"
                fontSize={'xl'}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
            <Flex mt={3} mr={10} justifyContent={'end'}>
              <Button
                rightIcon={<Icon as={MdSend} />}
                isLoading={loadingBtn}
                onClick={() => {
                  setLoadingBtn(true);
                  setTimeout(() => {
                    sendingEmail();
                  }, 500);
                }}
              >
                Send email
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
