import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Bar,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authAPI';
import { useData } from '../contexts/dataAPI';
import { formatStorageSize, modifyForGraph } from '../lib/calcStorage';
import AdminFeedback from './AdminFeedback';

export default function AdminLayoutDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { me } = useAuth();
  const { allAdminsAPI, graphAPI } = useData();

  const [alladmindata, setAlladmindata] = useState([]);
  const [graphdata, setGraphdata] = useState({});

  useEffect(() => {
    const fetching = async () => {
      let adminData = await allAdminsAPI();
      setAlladmindata(adminData);

      let graph = await graphAPI();
      setGraphdata(graph);
    };
    fetching();
  }, [allAdminsAPI, graphAPI]);

  return (
    <>
      <Image
        display={{ base: 'none', md: 'flex' }}
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
      />
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
        cursor={"pointer"}
        onClick={onOpen}
      />

      <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
        {/* <DrawerOverlay  /> */}
        <DrawerContent color={'text.light'} display={{ base: 'flex', md: 'none' }} >
          <DrawerCloseButton />
          <DrawerBody>
            {/* main */}
            <Flex
              w={'full'}
              h="full"
              flexFlow={'column'}
              py={10}
              className="scrolling"
            >
              <AdminFeedback />
              {/* chart */}
              <Flex
                w="full"
                boxShadow={'2xl'}
                flexFlow={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                {graphdata && (
                  <VictoryChart
                    height={400}
                    width={400}
                    domainPadding={{ x: graphdata?.data?.length * 2, y: 1 }}
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
              <Flex w="full" mx="auto" pt={10} flexFlow={'column'}>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
