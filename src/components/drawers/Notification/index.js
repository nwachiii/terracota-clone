import React, {useState} from 'react';
import {DrawerCloseButton} from '@chakra-ui/react';
import {Drawer, DrawerOverlay, DrawerContent} from '@chakra-ui/react';
import Main from './main';
import {useMutation, useQuery} from 'react-query';
import {fetchListOfCoowners, respondToCoOwnersRequest} from '../../../api/co_owners';
import {LoggedinUser} from '../../../constants/routes';
import CoOwnSummary from './coOwnSummary';
import InviteesReaction from './inviteesReaction';
import CoOwnersList from './coOwnersList';
import InviteRejection from './InviteesRejection';
import Breakdown from './breakdown';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    // outline: "1px solid slategrey", // You can include this line if needed
  },
};

const Notification = ({isNotOpen, onNotClose, onDrawerOpen}) => {
  const [type, setType] = useState('notification');
  const [requestInfo, setRequestInfo] = useState(null);
  const [isSpace, setIsSpace] = useState(false);
  const asset = requestInfo?.coownership_request?.equity;

  const {data, isLoading: coOwnerLoading} = useQuery(
    ['coowners', asset?.id],
    () => fetchListOfCoowners(asset?.id),
    {enabled: !!asset?.id}
  );
  const coowners = data?.data?.data ?? [];
  const isTheHost = coowners?.length
    ? coowners.find(item => item?.host?.id == LoggedinUser?.user?.id)
    : null;
  const theHost = coowners?.length
    ? coowners.find(item => item?.host?.id === item?.invitee?.id)
    : null;
  const coownerInfo = coowners?.length
    ? coowners.find(item => item?.invitee?.id == LoggedinUser?.user?.id)
    : null;

  const mutation = useMutation(data => respondToCoOwnersRequest(data, coownerInfo?.id), {
    onSuccess: async res => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: err => {},
  });

  const handleAccept = () => {
    const acceptInvitePayload = {
      action: 'accept',
    };
    mutation.mutate(acceptInvitePayload);
  };

  const handleReject = message => {
    const rejectionPayload = {
      action: 'decline',
      decline_reason: message,
    };
    mutation.mutate(rejectionPayload);
  };

  const handleCloseModal = () => {
    setType('notification');
    setRequestInfo(null);
    setIsSpace(false);
    mutation.reset();
  };

  return (
    <Drawer
      autoFocus={false}
      scrollBehavior="inside"
      isOpen={isNotOpen}
      onClose={onNotClose}
      onCloseComplete={handleCloseModal}
      blockScrollOnMount={true}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerContent
        maxW={{base: 'full', md: '400px'}}
        bg="card_bg"
        top="32px !important"
        right={{base: 'unset', md: '24px !important'}}
        w="full"
        h={'fit-content'}
        maxH={'720px'}
        minH={'50vh'}
        overflowY={'scroll'}
      >
        {type === 'notification' ? (
          <Main
            isSpace={isSpace}
            setIsSpace={setIsSpace}
            setType={setType}
            setRequestInfo={setRequestInfo}
            onNotClose={onNotClose}
            onDrawerOpen={onDrawerOpen}
          />
        ) : type === 'summary' ? (
          <CoOwnSummary
            asset={asset}
            setType={setType}
            onNotClose={onNotClose}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'breakdown' ? (
          <Breakdown
            asset={asset}
            setType={setType}
            onNotClose={onNotClose}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'inviteesReaction' ? (
          <InviteesReaction
            handleAccept={handleAccept}
            mutation={mutation}
            requestInfo={requestInfo}
            setType={setType}
            onNotClose={onNotClose}
            coOwnerLoading={coOwnerLoading}
            coowners={coowners}
            isTheHost={isTheHost}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'coOwnersList' ? (
          <CoOwnersList
            theHost={theHost}
            asset={asset}
            setType={setType}
            onNotClose={onNotClose}
            coOwnerLoading={coOwnerLoading}
            coowners={coowners}
            isTheHost={isTheHost}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'inviteRejection' ? (
          <InviteRejection
            handleReject={handleReject}
            mutation={mutation}
            theHost={theHost}
            asset={asset}
            setType={setType}
            onNotClose={onNotClose}
            coOwnerLoading={coOwnerLoading}
            isTheHost={isTheHost}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};

export default Notification;
