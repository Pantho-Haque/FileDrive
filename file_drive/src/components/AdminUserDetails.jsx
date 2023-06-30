import {
  Box,
  Button,
  Flex,
  GridItem,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineReload, AiTwotoneThunderbolt } from 'react-icons/ai';
import { BsArrowRight, BsShieldFill } from 'react-icons/bs';
import { useData } from '../contexts/dataAPI';
import { formatStorageSize } from '../lib/calcStorage';
import AdminUserReset from './AdminUserReset';

export default function AdminUserDetails({ alluserdata = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setresetadminAPI, useractivationAPI } = useData();

  const [deactivatingaccount, setdeactivatingaccount] = useState(false);
  const [selecteduser, setSelecteduser] = useState({});

  // assign remove admin
  const [asAdmin, setAsAdmin] = useState();
  const [asAdminLoading, setAsAdminLoading] = useState(false);
  // useEffect(() => {
  //   setAsAdminLoading(false);
  // }, [asAdmin]);

  const changeAsAdmin = async () => {
    try {
      await setresetadminAPI(
        selecteduser.id,
        setSelecteduser,
        setAsAdminLoading
      );
    } catch (error) {
      console.log(error);
    }
  };

  // deactivate the account
  const [isActive, setIsActive] = useState();
  const [activationLoading, setActivationLoading] = useState(false);

  useEffect(() => {
    setActivationLoading(false);
    setdeactivatingaccount(false);
  }, [isActive]);

  const changeActivation = async () => {
    try {
      await useractivationAPI(
        selecteduser.id,
        setSelecteduser,
        setActivationLoading,
        setdeactivatingaccount
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAsAdmin(selecteduser?.isAdmin);
    setIsActive(selecteduser?.visibility);
  }, [selecteduser]);

  return (
    <VStack w="100%" className="scrolling">
      {alluserdata &&
        alluserdata.map((el, i) => {
          return (
            <SimpleGrid
              columns={8}
              w="90%"
              mt="2"
              p={5}
              bg={el.visibility ? 'bg.dark' : 'tomato.500'}
              justifyContent={'space-between'}
              alignItems={'center'}
              cursor={'pointer'}
              _hover={{
                bg: el.visibility ? 'bg.medium' : 'tomato.600',
                border: '1px solid',
                borderColor: el.visibility ? 'border.logo' : 'tomato.900',
              }}
              onClick={() => {
                setSelecteduser(el);
                onOpen();
              }}
            >
              <GridItem>
                <Text mx={2}>
                  {el.id} {el.email_verified_at ? '' : '*'}
                </Text>
              </GridItem>
              <GridItem>
                <Icon as={BsArrowRight} color="yellow" />
              </GridItem>

              <GridItem colSpan={2}>
                <Text mx={2}>{el.name}</Text>
              </GridItem>
              <GridItem>
                <Icon as={AiTwotoneThunderbolt} color="yellow" mx={3} />
              </GridItem>
              <GridItem colSpan={3}>
                <Text mx={2}>{el.email}</Text>
              </GridItem>
            </SimpleGrid>
          );
        })}

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="bg.dark">
          <ModalHeader>
            <ModalCloseButton color="text.light" />
          </ModalHeader>
          {selecteduser && (
            <ModalBody fontSize={'xl'} pb={10} color="text.light">
              <VStack mt={5}>
                {/* admin asign remove */}
                <Flex
                  flexFlow={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  w="100%"
                  my={5}
                  p={3}
                  border="2px solid"
                  borderColor={'border.light'}
                >
                  <Icon
                    as={BsShieldFill}
                    fontSize={'2xl'}
                    color={asAdmin ? 'logo.500' : 'tomato.500'}
                  />
                  <Button
                    color="text.light"
                    isLoading={asAdminLoading}
                    bg={asAdmin ? 'logo.500' : 'tomato.500'}
                    _hover={
                      asAdmin
                        ? {
                            bg: 'logo.700',
                          }
                        : {
                            bg: 'tomato.700',
                          }
                    }
                    mt={3}
                    onClick={() => {
                      setAsAdminLoading(true);
                      setTimeout(() => {
                        changeAsAdmin();
                      }, 500);
                    }}
                  >
                    {asAdmin ? 'Remove as Admin' : 'Assign as admin'}
                  </Button>
                  {/* remove as admin */}
                </Flex>

                {/* details */}
                <Flex justifyContent={'center'} w="full">
                  <Text w="200px" pl={2}>
                    Files
                  </Text>
                  <Text w="200px">{selecteduser.number_of_files}</Text>
                </Flex>
                <Flex justifyContent={'center'} w="full">
                  <Text w="200px" pl={2}>
                    Folders
                  </Text>
                  <Text w="200px">{selecteduser.number_of_folders}</Text>
                </Flex>
                <Flex justifyContent={'center'} w="full">
                  <Text w="200px" pl={2}>
                    Total Used Storage
                  </Text>
                  <Text w="200px">
                    {formatStorageSize(selecteduser.used_storage)}
                  </Text>
                </Flex>

                <Flex
                  justifyContent={'space-around'}
                  alignItems={'center'}
                  w="full"
                  mt={5}
                >
                  <Text w="200px" pl={2} fontSize={'small'} my={5}>
                    You can reset the account. Hence all data of
                    <Box as={'span'} mx={1} color="tomato.500">
                      {selecteduser.name}
                    </Box>
                    will be removed
                  </Text>
                  <AdminUserReset
                    selecteduser={selecteduser}
                    setSelecteduser={setSelecteduser}
                  />
                </Flex>

                {/* deactivating account  */}
                {!deactivatingaccount ? (
                  <Button
                    mt={5}
                    color="text.light"
                    bg={isActive ? 'tomato.500' : 'logo.500'}
                    _hover={
                      isActive
                        ? {
                            bg: 'tomato.700',
                          }
                        : {
                            bg: 'logo.700',
                          }
                    }
                    w="full"
                    onClick={() => setdeactivatingaccount(true)}
                  >
                    {isActive ? 'Deactive the account' : 'Active the account'}
                  </Button>
                ) : (
                  <Flex
                    flexFlow={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w="full"
                    my={5}
                    p={3}
                    border="2px dashed"
                    borderColor={'border.light'}
                  >
                    <Text>Are you sure ?</Text>
                    <Flex my={3} w="50%" justifyContent={'space-around'}>
                      <Button
                        w="30%"
                        color="text.light"
                        bg={isActive ? 'tomato.500' : 'logo.500'}
                        _hover={
                          isActive
                            ? {
                                bg: 'tomato.700',
                              }
                            : {
                                bg: 'logo.700',
                              }
                        }
                        isLoading={activationLoading}
                        onClick={() => {
                          setActivationLoading(true);
                          setTimeout(() => {
                            changeActivation();
                          }, 500);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        w="30%"
                        color="text.light"
                        bg={isActive ? 'tomato.500' : 'logo.500'}
                        _hover={
                          isActive
                            ? {
                                bg: 'tomato.700',
                              }
                            : {
                                bg: 'logo.700',
                              }
                        }
                        onClick={() => setdeactivatingaccount(false)}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                )}
              </VStack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </VStack>
  );
}
