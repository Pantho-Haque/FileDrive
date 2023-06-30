import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineCloudDownload,
  AiOutlineDelete,
  AiOutlineFolderOpen,
  AiTwotoneThunderbolt,
} from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useData } from '../contexts/dataAPI';
import FolderAdd from './FolderAdd';
import FileDelete from './FileDelete';
import FolderDelete from './FolderDelete';
import { formatStorageSize } from '../lib/calcStorage';
import FileUpload from './FileUpload';

export default function FileFolder({
  folderInfo,
  setFolderInfo,
  me,
  setLoadingDash,
}) {
  const { folderListAPI, filesoffolderAPI } = useData();

  const [folderList, setFolderList] = useState(null);
  const [folderIndex, setFolderIndex] = useState(null);

  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      let data = await folderListAPI();
      setFolderList(data);
      if (!folderIndex || folderIndex < 0) setFolderIndex(0);
    };
    fetching();
  }, [folderIndex, folderListAPI, me]);

  useEffect(() => {
    const fetching = async () => {
      if (folderList[folderIndex]) {
        setFolderInfo(folderList[folderIndex]);
        let data = await filesoffolderAPI(folderList[folderIndex].id);
        setFiles(data);
      } else {
        setFiles(null);
      }
      setLoadingDash(false);
    };
    fetching();
  }, [
    filesoffolderAPI,
    folderIndex,
    folderList,
    me,
    setFolderInfo,
    setLoadingDash,
  ]);

  // console.log(loadingDash, folderList, files);

  return (
    folderList && (
      <Flex
        w={{ base: '90%', md: '50%' }}
        h="full"
        boxShadow={'xl'}
        rounded="2%"
        flexFlow="column"
      >
        <Flex
          w="full"
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={3}
          p={2}
          bg="bg.dark"
          roundedTop={'5%'}
        >
          <Text>
            Folder :{' '}
            {folderList
              ? formatStorageSize(folderList[folderIndex]?.folder_size)
              : formatStorageSize(0)}
            /{formatStorageSize(me.used_storage)}
          </Text>
          <Select
            variant="filled"
            w="30%"
            onChange={e => {
              setFolderIndex(e.target.value);
            }}
            value={folderIndex}
          >
            {folderList.map((el, i) => {
              return (
                <option key={Math.random()} value={i}>
                  {el.folder_name} {'<'}
                  {formatStorageSize(el.folder_size)}
                  {'>'}
                </option>
              );
            })}
          </Select>
          <HStack>
            <FolderAdd me={me} setFolderIndex={setFolderIndex} />

            <FolderDelete
              selectedfolder={folderList[folderIndex]}
              setFolderIndex={setFolderIndex}
            />
          </HStack>
        </Flex>
        {files && (
          <Flex w="full" h="full" flexFlow={'column'} className="scrolling">
            {files.length === 0 ? (
              <Box
                mt={52}
                p={10}
                alignSelf={'center'}
                border="2px dashed"
                borderColor={'logo.600'}
                color={'logo.400'}
                bg="bg.dark"
                opacity={0.3}
              >
                You can upload Files to The Specific folder
              </Box>
            ) : (
              files.map((el, i) => {
                return (
                  <Flex
                    key={Math.random()}
                    mt={3}
                    p={5}
                    w="full"
                    h={16}
                    bg="bg.medium"
                    cursor={'pointer'}
                    justifyContent="space-between"
                    _hover={{
                      // bg: 'bg.medium',
                      transform: 'scale(0.98)',
                    }}
                  >
                    <Flex>
                      <Text fontWeight={'semibold'}>{i + 1}</Text>
                      <Icon
                        alignSelf={'center'}
                        color="yellow"
                        as={AiTwotoneThunderbolt}
                        mx="3"
                      />
                      <Text>{el.file_name}</Text>
                    </Flex>
                    <HStack>
                      <code> {formatStorageSize(el.file_size)}</code>
                      <IconButton
                        onClick={() => {
                          window.open(el.file_link, '_blank');
                        }}
                        icon={<Icon w={6} h={6} as={AiOutlineFolderOpen} />}
                      />
                      <FileDelete file={el} />
                    </HStack>
                  </Flex>
                );
              })
            )}
          </Flex>
        )}
        <Flex w="20%" my={5} ml="auto" mr={10}>
          <FileUpload folderInfo={folderInfo} />
        </Flex>
        
      </Flex>
    )
  );
}
