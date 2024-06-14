import React from 'react';
import { Box, Link, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchWatchlist } from '../../../api/watchlist';
import { MdOutlineFileDownload } from 'react-icons/md';

const ViewBrochure = ({ file, color }) => {
  return (
    <Box
      as={Link}
      href={file}
      target='_blank'
      rel='noreferrer noopener'
      cursor='pointer'
      borderRadius='4.444px'
      px='10px'
      py='8px'
      border='0.9px solid'
      borderColor={'#D0D5DD'}
      boxShadow={`0px 0.889px 1.778px 0px rgba(16, 24, 40, 0.05)`}
      color='matador_text.200'
    >
      <MdOutlineFileDownload fontSize={`28px`} />
    </Box>
  );
};

export default ViewBrochure;
