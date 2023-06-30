import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useData } from '../contexts/dataAPI';

export default function FolderAdd({ me, setFolderIndex }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createFolderAPI } = useData();

  const [foldername, setFoldername] = useState('');

  const createFolder = async () => {
    try {
      await createFolderAPI({ folder_name: foldername });
      onClose();
      setFoldername('');
      setFolderIndex(me.number_of_folders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Button leftIcon={<Icon as={BsPlus} fontSize={'xl'} />} onClick={onOpen}>
        add folder
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light"/>
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Flex flexFlow={'column'} w="70%" mx="auto">
              <InputGroup mt={5} mb={5}>
                <InputLeftAddon
                  rounded={'none'}
                  children={'Folder Name'}
                  color="ash.300"
                />
                <Input
                  rounded={'none'}
                  type="text"
                  value={foldername}
                  onChange={e => {
                    setFoldername(e.target.value);
                  }}
                />
              </InputGroup>
              <Button onClick={createFolder}> Create </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
