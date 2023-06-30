import {
  Box,
  Button,
  Flex,
  HStack,
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
import { AiOutlineCloudUpload } from 'react-icons/ai';
import FilePonding from '../lib/FilePonding';
import { useData } from '../contexts/dataAPI';

export default function FileUpload({ folderInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { uploadfilesAPI } = useData();

  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState();

  const uploadFiles = async () => {
    const formData = new FormData();
    formData.append('file_name', filename); 
    formData.append('folder_id', folderInfo.id);
    formData.append('file', file[0].source);

    try {
      await uploadfilesAPI(formData,setUploading,onClose,setFilename,setFile);
    } catch (err) {
      console.log(err);
    }
  };

  if (!folderInfo) return <Box></Box>;

  return (
    <Box w="100%">
      <Button w="full" justifyContent="flex-start" onClick={onOpen}>
        <Icon w={8} h={8} mr={3} as={AiOutlineCloudUpload} />
        Upload
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody fontSize={'xl'} pb={10} color="text.light">
            <Flex flexFlow={'column'} w="70%" mx="auto">
              <HStack mt={7}>
                <Text> Uploading to folder : </Text>
                <Text fontWeight={'bold'} color="tomato.400">
                  {folderInfo?.folder_name}
                </Text>
              </HStack>
              <InputGroup mt={5} mb={5}>
                <InputLeftAddon
                  rounded={'none'}
                  children={'File Name'}
                  color="ash.300"
                />
                <Input
                  rounded={'none'}
                  type="text"
                  value={filename}
                  onChange={e => {
                    setFilename(e.target.value);
                  }}
                />
              </InputGroup>

              <FilePonding file={file} setFile={setFile} />

              <Button
                onClick={() => {
                  setUploading(true);
                  setTimeout(() => {
                    uploadFiles();
                  }, 500);
                }}
                mt={5}
                alignSelf={'end'}
                isLoading={uploading}
              >
                Upload
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
