import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiFillCamera } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';
import { MdVpnKey, MdAccountCircle, MdClose } from 'react-icons/md';

import logo from './../../assets/filedriveNavicon.svg';
import signupbackground from './../../assets/signupbackground.svg';
import { useAuth } from '../../contexts/authAPI';
import { BsCamera } from 'react-icons/bs';
import { FaCross } from 'react-icons/fa';

export default function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error(error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
  };

  const navigate = useNavigate();

  const { registerAPI } = useAuth();

  const [registering, setRegistering] = useState(false);
  const [capturedImage, setCapturedImage] = useState();
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_pic: null,
  });

  const handleCaptureClick = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw the video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the data URL of the canvas image
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const imageBlob = await (await fetch(imageDataUrl)).blob();

    // Update the state with the data URL
    setCapturedImage(imageDataUrl);
    setRegData({ ...regData, profile_pic: imageBlob });
    stopCamera();
    onClose();
  };

  const signup = async () => {
    try {
      const formData = new FormData();
      formData.append('name', regData.name);
      formData.append('email', regData.email);
      formData.append('password', regData.password);
      formData.append('password_confirmation', regData.password_confirmation);
      formData.append('profile_pic', regData.profile_pic, 'profilepic.jpeg');

      await registerAPI(formData,navigate,setRegistering);
    } catch (error) {
      console.error('Error:', error);
      // show error message in a modal or toast notification instead of alert
    }
  };

  return (
    <Flex
      width={'100%'}
      h={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        position="fixed"
        width={'100vw'}
        h={'100vh'}
        objectFit={'cover'}
        src={signupbackground}
        alt=""
      />

      {/* login box */}
      <Flex
        position={"relative"}
        bgColor={'rgba(24, 28, 40, 0.7)'}
        width={'500px'}
        padding={10}
        flexFlow={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={2}
        border={'2px solid'}
        borderColor={'logo.600'}
        rounded={10}
      >
        {/* <IconButton
              icon={<AiFillCamera />}
              variant="solid"
              alignSelf={'end'}
              w="10"
            /> */}

        <Image
          width="300px"
          bgColor={'transparent'}
          mb="15px"
          src={logo}
          alt=""
          srcset=""
        />
        {/* pictute */}
        <Flex
          w="100%"
          mt={7}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Input
            w="60%"
            pt={1}
            type="file"
            bg="bg.dark"
            color={'ash.200'}
            onChange={e => {
              setRegData({ ...regData, profile_pic: e.target.files[0] });
            }}
          />
          <Text>Or</Text> 
          <Button
            rightIcon={<AiFillCamera />}
            onClick={() => {
              onOpen();
              startCamera();
            }}
          >
            Capture
          </Button>
        </Flex>

        {/* user name  */}
        <InputGroup mt={5}>
          <InputLeftAddon
            children={<MdAccountCircle />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="text"
            placeholder="User name"
            value={regData.name}
            onChange={e => {
              setRegData({ ...regData, name: e.target.value });
            }}
          />
        </InputGroup>
        {/* email */}
        <InputGroup mt={5}>
          <InputLeftAddon
            children={<IoMdMail />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="email"
            placeholder="Email"
            value={regData.email}
            onChange={e => {
              setRegData({ ...regData, email: e.target.value });
            }}
          />
        </InputGroup>

        {/* password */}
        <InputGroup mt={5} alignItems={'center'} fontSize={'lg'}>
          <InputLeftAddon
            children={<MdVpnKey />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="password"
            placeholder="Password"
            fontSize={'lg'}
            value={regData.password}
            onChange={e => {
              setRegData({ ...regData, password: e.target.value });
            }}
          />
        </InputGroup>

        {/* retype password */}
        <InputGroup mt={5} alignItems={'center'} fontSize={'lg'}>
          <InputLeftAddon
            children={<MdVpnKey />}
            color="ash.300"
            fontSize={'xl'}
          />
          <Input
            type="password"
            placeholder="Re-type Password"
            fontSize={'lg'}
            value={regData.password_confirmation}
            onChange={e => {
              setRegData({ ...regData, password_confirmation: e.target.value });
            }}
          />
        </InputGroup>

        <Button w="100%" my={3} isLoading={registering} onClick={()=>{
          setRegistering(true);
          setTimeout(() => {
            signup();
          }, 500);
        }} >
          Sign up
        </Button>
        <hr width="100%" />
        <Text mt={5} alignSelf={'end'}>
          Already have an account?
        </Text>
        <Button
          alignSelf={'end'}
          variant={'outline'}
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
        {capturedImage && <Image
          top={-16}
          left={-16}
          position={'absolute'}
          w="150px"
          h="150px"
          objectFit={'cover'}
          rounded="50%"
          border={'2px solid'}
          borderColor={'logo.600'}
          zIndex={3}
          src={capturedImage}
        />}
      </Flex>

      {/* camera portion  */}

      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <IconButton
              icon={<MdClose />}
              onClick={() => {
                stopCamera();
                onClose();
              }}
            />
          </ModalHeader>
          <ModalBody p={3}>
            <video ref={videoRef} width="640" height="480" autoPlay />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{ display: 'none' }}
            />
            <Button mt={10} onClick={handleCaptureClick}>
              Capture Image
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
