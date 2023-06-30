import {
  Box,
  Button,
  Flex,
  HStack,
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
import { AiOutlineDelete } from 'react-icons/ai';
import { useData } from '../contexts/dataAPI';

export default function FileDelete({ file }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deletefileAPI } = useData();

  const deletethefile = async () => {
    try {
      await deletefileAPI(file.id);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <IconButton
        icon={<Icon w={6} h={6} as={AiOutlineDelete} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          bg="bg.dark"
          border={'3px solid'}
          borderColor={'tomato.600'}
        >
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Flex
              flexFlow={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={3}
            >
              <Text>Are you sure ?</Text>
              <HStack>
                <Text color={'tomato.300'}>{file.file_name}</Text>
                <Text>will be lost completely</Text>
              </HStack>
              <Flex my={3} mt={7} w="50%" justifyContent={'space-around'}>
                <Button
                  w="30%"
                  color="text.light"
                  bg="tomato.500"
                  _hover={{
                    bg: 'tomato.700',
                  }}
                  onClick={deletethefile}
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
