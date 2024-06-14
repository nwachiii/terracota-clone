import { Box } from '@chakra-ui/react';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { appCurrentTheme } from '../../utils/localStorage';
import { LIGHT } from '../../constants/names';
import { BsBookmarkDash, BsBookmarkDashFill } from 'react-icons/bs';

const WatchlistBookmark = ({ is_watchlist, handleWatchlist, color }) => {
  return (
    <Box onClick={handleWatchlist} fontSize={'28'} color={color || 'white'}>
      {is_watchlist ? <BsBookmarkDashFill /> : <BsBookmarkDash />}
    </Box>
  );
};

export default WatchlistBookmark;
