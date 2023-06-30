import { CircularProgress, CircularProgressLabel, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import FileUpload from './FileUpload'
import Profile from './Profile'
import { formatStorageSize } from '../lib/calcStorage'

export default function UserInfo({me,folderInfo,percentageStorage}) {
  return (
    <Flex w="full" maxH="full" flexFlow={'column'}>



    {/* Profile */}
    <VStack
      w="full"
      p={5}
      pb={10}
      bg="bg.medium"
      rounded="5%"
      boxShadow={'dark-lg'}
    >
      <Image
        src={me.profile_pic}
        rounded="50%"
        w="150px"
        h="150px"
        objectFit={'cover'}
      />
      <Text fontWeight={'semibold'} fontSize="lg" pb={5}>
        {me.name}
      </Text>
      <Text textAlign={'left'} w="100%" pl={3}>
        Folders: {me.number_of_folders}
      </Text>
      <Text textAlign={'left'} w="100%" pl={3}>
        Files: {me.number_of_files}
      </Text>
      <FileUpload folderInfo={folderInfo} />
      <Profile me={me} />
    </VStack>



  {/* Storage */}
    <VStack
      w="full"
      p={5}
      mt={10}
      bg="bg.medium"
      rounded="5%"
      boxShadow={'dark-lg'}
    >
      <Text alignSelf={'start'} fontWeight="semibold" fontSize={'xl'}>
        Storage
      </Text>
      <CircularProgress
        value={percentageStorage.toFixed(2)}
        color={
          percentageStorage < 50
            ? 'teal.500'
            : percentageStorage < 75
            ? 'yellow'
            : 'tomato.500'
        }
        trackColor="bg.dark"
        size="200px"
        thickness={'5px'}
      >
        <CircularProgressLabel className="oswald">
          {percentageStorage.toFixed(2)}%
        </CircularProgressLabel>
      </CircularProgress>
      <code>
        {formatStorageSize(me.used_storage)} /
        {formatStorageSize(me.total_storage)}
      </code>
    </VStack>
  </Flex>
  )
}
