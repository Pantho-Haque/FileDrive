import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
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
import { AiOutlineReload } from 'react-icons/ai';
import { useData } from '../contexts/dataAPI';

export default function AdminUserReset({ selecteduser,setSelecteduser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { resettheaccountAPI } = useData();

  const [reseting, setReseting] = useState(false);
  const resettheaccount =async () => {
    try {
        await resettheaccountAPI( selecteduser.id,setSelecteduser, setReseting,onClose);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <IconButton
        onClick={onOpen}
        icon={<Icon as={AiOutlineReload} />}
        color="text.light"
        bg="tomato.500"
        _hover={{
          bg: 'tomato.700',
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Flex my={10}>
              <Text w="50%">
                Proceed the reset of <br />
                <Box as={'span'} mx={1} color="tomato.500">
                  {selecteduser.name}'s
                </Box>
                account
              </Text>

              <Flex my={3} w="50%" justifyContent={'space-around'}>
                <Button
                  w="30%"
                  color="text.light"
                  bg="tomato.500"
                  _hover={{
                    bg: 'tomato.700',
                  }}
                  isLoading={reseting}
                  onClick={() => {
                    setReseting(true);
                    setTimeout(() => {
                      resettheaccount();
                    }, 500);
                  }}
                >
                  Proceed
                </Button>
                <Button
                  w="30%"
                  color="text.light"
                  bg="tomato.500"
                  _hover={{
                    bg: 'tomato.700',
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
