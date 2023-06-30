import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import NavLayout from './Layouts/NavLayout';

import { useAuth } from '../contexts/authAPI';

import { useEffect, useState } from 'react';
import preloader from '../assets/preloader.json';
import FileFolder from '../components/FileFolder';
import FileUpload from '../components/FileUpload';
import Profile from '../components/Profile';
import { useData } from '../contexts/dataAPI';
import LottieMaking from '../lib/LottieMaking';
import { formatStorageSize } from '../lib/calcStorage';
import UserInfo from '../components/UserInfo';
import History from '../components/History';

export default function Dashboard() {
  const { me } = useAuth();
  const { fileListAPI } = useData();

  const [percentageStorage, setPercentageStorage] = useState(0);
  const [fileData, setFileData] = useState();
  const [folderInfo, setFolderInfo] = useState(null);
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      let data = await fileListAPI();
      setFileData(data);
      setPercentageStorage((me.used_storage / me.total_storage) * 100);
      // setLoadingdashboard(false);
    };
    fetching();
  }, [fileListAPI]); 

  return (
    <NavLayout>
      {/* preloader */}
      <Flex
        w="100%"
        h="full"
        position={'absolute'}
        top={0}
        left={0}
        zIndex={3}
        display={loadingDash ? 'flex' : 'none'}
        justifyContent={'center'}
        alignItems={'center'}
        bg="bg.medium"
      >
        <LottieMaking animationData={preloader} h={200} w={200} />
      </Flex>

      <Flex
        flexFlow={'row'}
        w="full"
        h="full"
        justifyContent={'space-around'}
        alignItems="start"
        spacing={10}
        pt={5}
        pb={5}
      >

        {/* user information */}
        <Flex  w="20%" h="full" display={{ base: 'none', md: 'flex' }} className='scrolling'>

        <UserInfo
          me={me}
          folderInfo={folderInfo}
          percentageStorage={percentageStorage}
          />
          </Flex>

        {/* folders with files */}
        <FileFolder
          me={me}
          folderInfo={folderInfo}
          setFolderInfo={setFolderInfo}
          setLoadingDash={setLoadingDash}
        />

        {/* History */}
        <Flex  w="20%" h="full" display={{ base: 'none', md: 'flex' }}>
          <History fileData={fileData} />
        </Flex>
      </Flex>
    </NavLayout>
  );
}
