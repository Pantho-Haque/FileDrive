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

export default function Feedback({ me }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bugfeedbackAPI } = useData();

  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submission = async () => {
    try {
      await bugfeedbackAPI(
        {
          user_id: me.id,
          name: me.name,
          email: me.email,
          feedback: text,
        },
        setSubmitting,
        setText,
        onClose
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Button mx={5} onClick={onOpen} color="logo.500">
        <Icon as={AiFillBug} mx={2} />
        Bug | <Icon as={MdSend} mx={2} /> Feedback
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          <ModalBody
            fontSize={'xl'}
            pb={10}
            color="text.light"
            className="anek"
          >
            <Flex h="40" alignItems={'end'} m={5}>
              <Textarea
                h="full"
                value={text}
                onChange={e => {
                  setText(e.target.value);
                }}

                className="scrolling"
                rounded="none"
                padding="3"
                bg="bg.dark"
                color={'yellow.300'}
                resize={"none"}
              ></Textarea>

              <Button
                ml={3}
                w="30%"
                isLoading={submitting}
                onClick={() => {
                  setSubmitting(true);
                  setTimeout(() => {
                    submission();
                  }, 500);
                }}
                color={"text.light"}
                bg="tomato.500"
                _hover={{
                    bg:"tomato.700"
                }}
              >
                submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
