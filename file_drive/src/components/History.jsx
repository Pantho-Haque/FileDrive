import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

export default function History({ fileData }) {
  return (
    <Flex
      
      w="full"
      h="full"
      bg="bg.medium"
      rounded="2%"
      boxShadow={'dark-lg'}
      p={3}
      flexFlow="column"
      className="scrolling"
    >
      <Text
        fontWeight={'semibold'}
        fontSize="30"
        w="full"
        h="16"
        p="3"
        borderBottom={'2px solid '}
        borderColor="border.logo"
        className="anek"
      >
        Today
      </Text>
      <Flex flexFlow={'column'} m={3} pl={8}>
        {fileData?.today
          ? fileData.today.map((el, i) => (
              <Text key={Math.random()} cursor="pointer" py={3}>
                <Icon color="yellow" as={BsArrowRight} /> {el.file_name}
              </Text>
            ))
          : ''}
      </Flex>
      <Text
        fontWeight={'semibold'}
        fontSize="30"
        w="full"
        h="16"
        p="3"
        borderBottom={'2px solid '}
        borderColor="border.logo"
        className="anek"
      >
        Yesterday
      </Text>
      <Flex flexFlow={'column'} m={3} pl={8}>
        {fileData?.yesterday
          ? fileData.yesterday.map((el, i) => (
              <Text key={Math.random()} cursor="pointer" py={3}>
                <Icon color="yellow" as={BsArrowRight} /> {el.file_name}
              </Text>
            ))
          : ''}
      </Flex>
      <Text
        fontWeight={'semibold'}
        fontSize="30"
        w="full"
        h="16"
        p="3"
        borderBottom={'2px solid '}
        borderColor="border.logo"
        className="anek"
      >
        Long ago
      </Text>
      <Flex flexFlow={'column'} m={3} pl={8}>
        {fileData?.others
          ? fileData.others.map((el, i) => (
              <Text key={Math.random()} cursor="pointer" py={3}>
                <Icon color="yellow" as={BsArrowRight} />
                {el.file_name}
              </Text>
            ))
          : ''}
      </Flex>
    </Flex>
  );
}
