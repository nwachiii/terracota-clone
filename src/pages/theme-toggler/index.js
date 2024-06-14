import { Center } from '@chakra-ui/react';
import LayoutView from '../../components/layout';
import { ColorToggler } from '../../components/layout/theme/color_toggler';
import { ThemeToggle } from '../../components/layout/theme/theme_toggler';

export default function ToggleThemePage({ changeTheme, changeColors }) {
  return (
    <LayoutView changeTheme={changeTheme}>
      <Center
        w="100%"
        minH={'80vh'}
        flexDirection={'column'}
        gap={'20px'}
        bg={'matador_background.100'}
      >
        <ThemeToggle changeTheme={changeTheme} />
        <ColorToggler changeColors={changeColors} />
      </Center>
    </LayoutView>
  );
}
