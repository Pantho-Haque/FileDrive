import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import UserInfo from './UserInfo';
import { useAuth } from '../contexts/authAPI';
import { useData } from '../contexts/dataAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import History from './History';

export default function LayoutDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { me } = useAuth();
  const { fileListAPI } = useData();

  const [percentageStorage, setPercentageStorage] = useState(0);
  const [fileData, setFileData] = useState();
  const [folderInfo, setFolderInfo] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      let data = await fileListAPI();
      setFileData(data);
      setPercentageStorage((me.used_storage / me.total_storage) * 100);
    };
    fetching();
  }, [fileListAPI]);

  return (
    <>
      <Image
        display={{ base: 'flex', md: 'none' }}
        alignSelf={'center'}
        src={me.profile_pic}
        border="3px solid"
        borderColor={'border.logo'}
        m={3} 
        mr={10}
        rounded="50%"
        width="16"
        height="16"
        objectFit={'cover'}
        onClick={onOpen}
      />

      <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent color={'text.light'} display={{base:"flex",md:"none"}} >
          <DrawerCloseButton />
          <DrawerBody>


            {/* main */}
            <Flex w={'full'} h="full" py={10}  justifyContent={"space-around"}>
              <Flex w="45%">
                <UserInfo
                  me={me}
                  percentageStorage={percentageStorage}
                />
              </Flex>
              <Flex w="45%">
                <History fileData={fileData} />
              </Flex>
            </Flex>




          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
