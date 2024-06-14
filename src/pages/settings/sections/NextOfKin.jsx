import React from 'react';
import {Box, GridItem, Image, SimpleGrid, useToast, Text, Stack} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {
  Button,
  FormInput,
  FormSelect,
  FormTextarea,
  Spinner,
  UploadProfilePicture,
} from '../../../ui-lib';
import pencil from '../../../images/pencil.png';
import {getSettingsData, updateSettings} from '../../../api/Settings';
import {useMutation, useQuery} from 'react-query';

const Profile = () => {
  const toast = useToast();

  const next_of_kinQuery = useQuery(
    ['getSettingsData', 'profile'],
    () => getSettingsData({next_of_kin: true}),
    {
      onSuccess: res => {
        formik.setValues({
          avatar: res?.data?.data?.avatar || '',
          first_name: res?.data?.data?.first_name || '',
          middle_name: res?.data?.data?.middle_name || '',
          last_name: res?.data?.data?.last_name || '',
          email: res?.data?.data?.email || '',
          phone: res?.data?.data?.phone || '',
          relationship: res?.data?.data?.relationship || '',
          residential_address: res?.data?.data?.residential_address || '',
        });
      },
    }
  );

  const validateForm = values => {
    const errors = {};
    if (!values?.phone || values?.phone?.length != 10) {
      errors.phone = 'Please Enter the 10 digit Number !';
    } else if (!/^[0-9]+$/.test(values?.phone)) {
      errors.phone = 'Please Enter the Digit Only !';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      relationship: '',
      residential_address: '',
    },
    onSubmit: values => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== '') {
          exp[key] = value;
        }
      }
      exp = {next_of_kin: true, ...exp};
      mutation.mutate(exp);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const mutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: async res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await next_of_kinQuery?.refetch();
    },
    onError: err => {
      toast({
        description: `${err?.response?.data?.message || 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const AvatarMutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      next_of_kinQuery?.refetch();
    },
    onError: res => {
      toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const onAvatarChange = async file => {
    AvatarMutation.mutate({
      next_of_kin: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return await next_of_kinQuery.refetch();
  };

  const handleUpdate = () => {
    let exp = {};
    for (const [key, value] of Object.entries(formik.values)) {
      let val = value.toString();
      if (val.trim() !== '') {
        exp[key] = value;
      }
    }
    exp = {next_of_kin: true, ...exp};
    mutation.mutate(exp);
  };

  return (
		<Stack padding={{base: '0', lg: '34px'}} w='full'>
			{next_of_kinQuery?.isLoading ? (
				<Spinner noAbsolute />
			) : (
				<Box>
					{/* <UploadProfilePicture
            containerStyle={{
              width: "max-content",
              margin: "auto",
            }}
            id="avatar"
            name="avatar"
            setFiles={onAvatarChange}
            isAvatarLoading={AvatarMutation.isLoading}
            avatar={formik.values.avatar}
            numOfFiles={1}
            isProfilePic
          /> */}

					{/* first section */}
					<SimpleGrid mt={{base: '10px', lg: '40px'}} columns={{base: 1, lg: 3}} spacing='19px' justifyContent={'space-between'}>
						<GridItem colSpan={{base: 1, lg: 1}} mb={{base: '7px', lg: '30px'}} maxW='413px'>
							<Text fontSize={{base: 16, md: 23}} fontWeight={600} textTransform={'uppercase'}>
								Next of Kin
							</Text>
						</GridItem>
						<GridItem colSpan={{base: 1, lg: 2}} mb={{base: '7px', lg: '30px'}} p='24px' border='1px solid #EAECF0' borderRadius={'2px'} boxShadow={'0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'}>
							<SimpleGrid columns={{base: 1, lg: 2}} spacing='19px'>
								<FormInput type='text' label='Full Name' onChange={formik.handleChange('first_name')} value={`${formik.values.first_name}${formik.values.middle_name}${formik.values.last_name}`} placeholder='Enter full name' disabled />
								<FormInput label='Email address' type='email' onChange={formik.handleChange('email')} value={formik.values.email} placeholder={'Enter email address'} />
								<FormInput label='Phone number' type='phone' onChange={formik.handleChange('phone')} value={formik.values.phone} placeholder={'Enter phone number'} />
								<FormSelect options={['Father', 'Mother', 'Brother', 'Sister', 'Partner']} label='Relationship' type='text' onChange={formik.handleChange('relationship')} value={formik.values.relationship} placeholder='Select relationship' />
								<GridItem colSpan={{base: 1, lg: 2}}>
									<FormInput label='Residential Address' type='email' onChange={formik.handleChange('residential_address')} value={formik.values.residential_address} placeholder='Enter residential address' />
								</GridItem>
							</SimpleGrid>
						</GridItem>
					</SimpleGrid>
				</Box>
			)}

			<Button onClick={handleUpdate} isLoading={next_of_kinQuery?.isLoading || mutation.isLoading} mt='20px' color='white' bg='#DDB057' w={{base: 'full', lg: '200px'}} type='submit' h='48px' fontSize={16} alignSelf='end'>
				Update
			</Button>
		</Stack>
	);
};

export default Profile;