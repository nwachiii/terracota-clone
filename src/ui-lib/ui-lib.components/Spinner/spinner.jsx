import {AbsoluteCenter, Center, resolveStyleConfig} from '@chakra-ui/react';
import {Oval} from 'react-loader-spinner';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
const primary = '#DDB057';
const primaryShade = '#DAB91F88';

export const Spinner = ({noAbsolute, size, ...rest}) =>
  noAbsolute ? (
    <RegularSpinner
      thickness="10px"
      speed="0.65s"
      emptyColor="gray.200"
      color="primary"
      size={size || '300px'}
      {...resolveStyleConfig}
    />
  ) : (
    <OvalLoader {...rest} />
  );

export const OvalLoader = ({...rest}) => {
  return (
    <AbsoluteCenter color={`text`}>
      <Oval
        height={80}
        width={80}
        color={primary}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={primaryShade}
        strokeWidth={2}
        strokeWidthSecondary={2}
        {...rest}
      />
    </AbsoluteCenter>
  );
};
export const RegularSpinner = () => {
  return (
    <Center color="text">
      <Oval
        height={80}
        width={80}
        color={primary}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={primaryShade}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </Center>
  );
};
