import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import {
  Bar,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

import { BsSearch } from 'react-icons/bs';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authAPI';
import { useData } from '../../contexts/dataAPI';

import preloading from '../../assets/preloader.json';
import LottieMaking from '../../lib/LottieMaking.jsx';
import { formatStorageSize, modifyForGraph } from '../../lib/calcStorage';
import AdminUserDetails from '../../components/AdminUserDetails';
import AdminFeedback from '../../components/AdminFeedback';
import AdminLayoutDrawer from '../../components/AdminLayoutDrawer';

export default function Admin() {
  const { me } = useAuth();
  const {
    allusersAPI,
    usersearchAPI,
    allAdminsAPI,
    graphAPI,
  } = useData();
  const navigate = useNavigate();

  const [loadingContent, setLoadingContent] = useState(true);

  const [keyword, setKeyword] = useState('');
  const [alluserdata, setAlluserdata] = useState([]);
  const [alladmindata, setAlladmindata] = useState([]);
  const [graphdata, setGraphdata] = useState({});

  useEffect(() => {
    const fetching = async () => {
      let data =
        keyword === '' ? await allusersAPI() : await usersearchAPI(keyword);
      console.log(data);
      setAlluserdata(data);

      let adminData = await allAdminsAPI();
      setAlladmindata(adminData);

      let graph = await graphAPI();
      setGraphdata(graph);

      setLoadingContent(false);
    };
    fetching();
  }, [
    allAdminsAPI,
    allusersAPI,
    graphAPI,
    keyword,
    usersearchAPI,
  ]);

  if (!me.isAdmin) {
    return <Navigate to="/not-an-admin" />;
  }

  if (loadingContent) {
    return (
      <Flex
        w="100vw"
        h="100vh"
        justifyContent={'center'}
        alignItems={'center'}
        bg="bg.dark"
      >
        <LottieMaking animationData={preloading} h={200} w={200} />
      </Flex>
    );
  }

  return (
    <Flex w="100vw" h="100vh" flexFlow={'column'}>
      {/* panel */}
      <Flex
        p={3}
        px={10}
        w="full"
        h={20}
        justifyContent={'space-between'}
        alignItems={'center'}
        bg="bg.dark"
        borderBottom={'2px solid'}
        borderColor={'border.dark'}
      >
        <Text fontSize={{ base: 'xl', md: '5xl' }} fontStyle={'italic'}>
          Admin Panel
        </Text>
        <Flex alignItems={"center"}>

          <Button
            // alignSelf={'end'}
            mr={3}
            bg="bg.stand"
            _hover={{
              bg: 'bg.lighter',
            }}
            textAlign={'center'}
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Dashboard
          </Button>
          
          <Flex display={{ base: 'none', md: 'flex' }}>
            <AdminFeedback />
          </Flex>
          
          <AdminLayoutDrawer me={me} />
        </Flex>
      </Flex>

      {/* body */}
      <Flex w="100vw" h="90%" className="scrolling">
        {/* user side */}
        <Flex
          w={{ base: 'full', md: '40%' }}
          boxShadow={'2xl'}
          flexFlow={'column'}
        >
          <InputGroup w="60%" h={20} p={5} mx="auto">
            <InputLeftAddon
              children={<BsSearch />}
              color="ash.300"
              fontSize={'xl'}
              rounded={'none'}
            />
            <Input
              rounded={'none'}
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={e => {
                setKeyword(e.target.value);
              }}
            />
          </InputGroup>
          <AdminUserDetails alluserdata={alluserdata} />
        </Flex>

        {/* chart */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          w="40%"
          boxShadow={'2xl'}
          flexFlow={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {graphdata && (
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: graphdata.data.length * 2, y: 1 }}
              theme={VictoryTheme.material}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            >
              {/* <VictoryLabel
                text="Chart Heading"
                x={200}
                y={30}
                textAnchor="middle"
              /> */}
              <VictoryBar
                dataComponent={<Bar />}
                style={{
                  data: { fill: 'tomato' },
                  labels: { fill: 'white' },
                }}
                data={modifyForGraph(graphdata).plot}
                labels={({ datum }) => datum.y}
                labelComponent={
                  <VictoryTooltip
                    style={{ fill: 'white' }}
                    dy={-1}
                    flyoutStyle={{ fill: 'tomato' }}
                  />
                }
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            target: 'labels',
                            mutation: () => ({ active: true }),
                          },
                        ];
                      },
                      onMouseOut: () => {
                        return [
                          {
                            target: 'labels',
                            mutation: () => ({ active: false }),
                          },
                        ];
                      },
                    },
                  },
                ]}
              />
            </VictoryChart>
          )}
          <Text mb={10} fontWeight={'semibold'}>
            Total Consumed Storage :{' '}
            {formatStorageSize(graphdata.totalStorageUsed)}
          </Text>
        </Flex>

        {/* admin list */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          w="15%"
          mx="auto"
          pt={10}
          flexFlow={'column'}
        >
          <Text
            fontWeight={'semibold'}
            fontSize={'xl'}
            mb={10}
            pl={5}
            borderBottom={'2px solid'}
            borderColor={'logo.800'}
          >
            List of other admins
          </Text>

          {alladmindata.map((el, i) => {
            return (
              <Flex pl={5}>
                <Text>
                  {i + 1} . {el.name}
                </Text>
                <Text
                  w="5"
                  h="5"
                  ml={3}
                  bg="logo.800"
                  textAlign={'center'}
                  rounded={'full'}
                >
                  {el.id}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      {/* body */}
    </Flex>
  );
}
