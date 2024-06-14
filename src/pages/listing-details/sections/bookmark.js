import React from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';
import { fetchWatchlist, toggleWatchlist } from '../../../api/watchlist';
import WatchlistBookmark from '../../../components/cards/watchlistBookmark';
import { appCurrentTheme } from '../../../utils/localStorage';
import { LIGHT } from '../../../constants/names';
import { colors_object } from '../../../theme/colors';

const BookmarkProperty = ({ info, refetch, color }) => {
  const toast = useToast();
  const { data: watchlistData, refetch: watchlistRefetch } = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );
  const watchlist = watchlistData?.data?.watchlist;

  const isWatchlisted = watchlist?.find((ppt) => ppt?.project?.id === info?.id);

  const toggleWatchlistMutation = useMutation(
    (body) => toggleWatchlist(body.id),
    {
      onSuccess: async (res) => {
        toast({
          description: `${info?.name} in your watchlist has been updated`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
        await refetch();
        await watchlistRefetch();
      },
      onError: (err) => {
        toast({
          title: 'An error occured',
          description: `${err?.code} : ${err?.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
      }
    }
  );

  const handleWatchlist = (e) => {
    if (toggleWatchlistMutation.isLoading) return;
    e.stopPropagation();
    return toggleWatchlistMutation.mutate({ id: info?.id });
  };

  return (
    <Box
      cursor='pointer'
      borderRadius='4.444px'
      px='10px'
      py='8px'
      border='0.9px solid'
      borderColor={'#D0D5DD'}
      boxShadow={`0px 0.889px 1.778px 0px rgba(16, 24, 40, 0.05)`}
      onClick={handleWatchlist}
    >
      <WatchlistBookmark
        color='matador_text.200'
        // color='red'
        bg={'white'}
        cursor='pointer'
        border='0.5px solid'
        borderColor={'text'}
        is_watchlist={isWatchlisted}
        handleWatchlist={handleWatchlist}
      />
    </Box>
  );
};

export default BookmarkProperty;
