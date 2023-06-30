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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillBug } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { useData } from '../contexts/dataAPI';
import { useEffect } from 'react';

export default function AdminFeedback() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getallbugsfeedbacksAPI } = useData();
  const [bugFeedbackData, setBugFeedbackData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      let bugfeedback = await getallbugsfeedbacksAPI();
      setBugFeedbackData(bugfeedback);
    };

    fetching();
  }, [getallbugsfeedbacksAPI]);

  return (
    <Box>
      <Button mx={5} onClick={onOpen} color="logo.500">
        <Icon as={AiFillBug} mx={2} />
        Bug | <Icon as={MdSend} mx={2} /> Feedback
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark" h={"70vh"}>
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody
            fontSize={'xl'}
            pb={10}
            
            color="text.light"
            className="anek scrolling"
          >
            {bugFeedbackData.map((el, i) => {
              return (
                <Flex
                  w="full"
                  my={3}
                  py={5}
                  borderTop={'1px solid'}
                  borderBottom={'1px solid'}
                  borderColor={'logo.500'}
                >
                  <Flex flexFlow={'column'} w="50%" fontSize={'sm'}>
                    <Text>Id: {el.user_id}</Text>
                    <Text>Name: {el.name}</Text>
                    <Text>Email: {el.email}</Text>
                  </Flex>
                  <Flex
                    w="40%"
                    pl={5}
                    borderLeft={'1px solid'}
                    borderColor={'logo.500'}
                  >
                    <Text>{el.feedback}</Text>
                  </Flex>
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
