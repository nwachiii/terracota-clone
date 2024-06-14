import React from 'react';
import {
  Box,
  GridItem,
  Image,
  SimpleGrid,
  useToast,
  Center,
  Text,
  VStack,
  Divider,
  FormLabel,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, FormInput, FormSelect, Spinner, UploadProfilePicture} from '../../../ui-lib';
import pencil from '../../../images/pencil.png';
import {getSettingsData, updateSettings} from '../../../api/Settings';
import {useMutation, useQuery} from 'react-query';
import Documents from './Documents';

const Profile = () => {
  const toast = useToast();

  const profileQuery = useQuery(
    ['getSettingsData', 'profile'],
    () => getSettingsData({profile: true}),
    {
      onSuccess: res => {
        formik.setValues({
          avatar: res.data?.data?.avatar,
          full_name: res.data?.data?.first_name + ' ' + res.data?.data?.last_name || '',
          date_of_birth: res.data?.data?.date_of_birth || '',
          email: res.data?.data?.email || '',
          marital_status: res.data?.data?.marital_status || '',
          phone: res.data?.data?.phone || '',
          highest_education: res.data?.data?.highest_education || '',
          employment_status: res.data?.data?.employment_status || '',
          company_name: res.data?.data?.company_name || '',
          occupation: res.data?.data?.occupation || '',
          monthly_income: res.data?.data?.monthly_income || '',
          bvn: res.data?.data?.bvn || '',
          address: res.data?.data?.address || '',
          company_address: res.data?.data?.company_address || '',
          country: {code: '+234'},
        });
      },
    }
  );

  const mutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: async res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return await profileQuery?.refetch();
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

  const AvatarMutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      profileQuery.refetch();
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

  const validateForm = values => {
    const errors = {};
    if (!values.phone || !(values.phone.length >= 10 && values.phone.length <= 15)) {
      errors.phone = 'Invalid input length !';
    } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = 'Please Enter Digits Only !';
    } else if (!/^\d+$/.test(values.monthly_income)) {
      errors.monthly_income = 'please Enter  Digits only';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      avatar: '',
      full_name: '',
      date_of_birth: '',
      email: '',
      marital_status: '',
      phone: '',
      highest_education: '',
      employment_status: '',
      company_name: '',
      occupation: '',
      monthly_income: '',
      bvn: '',
      address: '',
      company_address: '',
    },
    onSubmit: values => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value?.toString();
        if (val.trim() !== '') {
          exp[key] = value;
        }
      }
      exp = {profile_details: true, ...exp};
      mutation.mutate(exp);
    },
    validate: validateForm,
  });

  const onAvatarChange = file => {
    AvatarMutation.mutate({
      profile_avatar: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return profileQuery.refetch();
  };

  const handleUpdate = e => {
    e.preventDefault();
    let exp = {};

    for (const [key, value] of Object.entries(formik.values)) {
      let val = value?.toString();
      if (val?.trim() !== '') exp[key] = value;
    }
    exp = {profile_details: true, ...exp};
    delete exp.avatar;
    mutation.mutate(exp);
  };

  return (
    <Box padding={{base: '0', lg: '34px'}} w="full">
      {profileQuery?.isLoading ? (
        <Center w="full" h="50vh">
          <Spinner noAbsolute />
        </Center>
      ) : (
        <Box w="full">
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
            mt={{ base: '20px', lg: ''}}
          /> */}
          <VStack
            mt={{base: '0px', lg: '10px'}}
            w="full"
            align={'stretch'}
            spacing={{base: '10px', lg: '20px'}}
            divider={<Divider w="full" />}
          >
            {/* first section */}
            <SimpleGrid
              columns={{base: 1, lg: 3}}
              spacing={{base: '5px', lg: '19px'}}
              justifyContent={'space-between'}
            >
              <GridItem colSpan={1} mb={{base: '7px', lg: '30px'}} maxW="413px">
                <Text fontSize={{base: 16, md: 23}} fontWeight={600} textTransform={'uppercase'}>
                  Basic Information
                </Text>
              </GridItem>
              <GridItem
                colSpan={{base: 1, lg: 2}}
                mb={{base: '7px', lg: '30px'}}
                p="24px"
                border="1px solid #EAECF0"
                borderRadius={'2px'}
                boxShadow={
                  '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'
                }
              >
                <SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: '5px', lg: '19px'}}>
                  <FormInput
                    type="text"
                    label="Full Name"
                    onChange={formik.handleChange('full_name')}
                    value={formik.values.full_name}
                    placeholder="Enter full name"
                    fontSize={13}
                    disabled
                  />
                  <FormInput
                    label="Date of Birth"
                    type="text"
                    onChange={formik.handleChange('date_of_birth')}
                    placeholder="30/06/1987"
                    value={formik.values.date_of_birth}
                    disabled
                    fontSize={13}
                  />
                  <FormInput
                    label="Email address"
                    type="email"
                    onChange={formik.handleChange('email')}
                    value={formik.values.email}
                    placeholder={'Enter email address'}
                    disabled={true}
                    fontSize={13}
                  />
                  <FormSelect
                    options={['Married', 'Single']}
                    label="Marital Status"
                    type="text"
                    onChange={formik.handleChange('marital_status')}
                    value={formik.values.marital_status}
                    placeholder="Select marital status"
                  />
                  <FormInput
                    label="Phone number"
                    type="phone"
                    onChange={formik.handleChange('phone')}
                    value={formik.values.phone}
                    placeholder={'Enter phone number'}
                    disabled={true}
                    fontSize={13}
                    formik={formik}
                  />
                </SimpleGrid>
              </GridItem>
            </SimpleGrid>

            {/* second section */}
            <SimpleGrid
              mt={{base: '10px', lg: '20px'}}
              columns={{base: 1, lg: 3}}
              spacing={{base: '5px', lg: '19px'}}
              justifyContent={'space-between'}
            >
              <GridItem colSpan={{base: 1, lg: 1}} mb={{base: '7px', lg: '30px'}} maxW="413px">
                <Text fontSize={{base: 16, md: 23}} fontWeight={600} textTransform={'uppercase'}>
                  education & employment
                </Text>
              </GridItem>
              <GridItem
                colSpan={{base: 1, lg: 2}}
                mb={{base: '7px', lg: '30px'}}
                p="24px"
                border="1px solid #EAECF0"
                borderRadius={'2px'}
                boxShadow={
                  '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'
                }
              >
                <SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: '5px', lg: '19px'}}>
                  <FormSelect
                    label="Highest Education Level"
                    type="text"
                    onChange={formik.handleChange('highest_education')}
                    value={formik.values.highest_education}
                    placeholder="Select level"
                    options={[
                      'High School Diploma',
                      `Bachelor's Degree`,
                      'Post-Secondary Certificate',
                      'Some college',
                      `Master's Degree`,
                      'PHD',
                    ]}
                  />
                  <FormSelect
                    label="Employment Status"
                    type="text"
                    onChange={formik.handleChange('employment_status')}
                    value={formik.values.employment_status}
                    placeholder="Select"
                    options={['Employed', 'Unemployed', 'Self employed']}
                  />
                  <FormInput
                    label="Company Name"
                    type="text"
                    onChange={formik.handleChange('company_name')}
                    value={formik.values.company_name}
                    placeholder="Enter company's name"
                  />
                  <FormInput
                    label="Occupation"
                    type="text"
                    onChange={formik.handleChange('occupation')}
                    value={formik.values.occupation}
                    placeholder="Enter occupation"
                  />
                  <FormInput
                    label="Monthly Income"
                    type="text"
                    onChange={formik.handleChange('monthly_income')}
                    value={formik.values.monthly_income}
                    placeholder="Enter monthly income"
                  />
                  <Box display={{base: 'none', lg: 'flex'}}>
                    <FormInput
                      label="Company Address"
                      type="text"
                      onChange={formik.handleChange('company_address')}
                      value={formik.values.company_address}
                      placeholder="Enter company address"
                    />
                  </Box>
                </SimpleGrid>
              </GridItem>
            </SimpleGrid>

            {/* third section */}
            <SimpleGrid
              mt={{base: '10px', lg: '20px'}}
              columns={{base: 1, lg: 3}}
              spacing={{base: '5px', lg: '19px'}}
              justifyContent={'space-between'}
            >
              <GridItem colSpan={{base: 1, lg: 1}} mb={{base: '7px', lg: '10px'}} maxW="413px">
                <Text fontSize={{base: 16, md: 23}} fontWeight={600} textTransform={'uppercase'}>
                  additional info
                </Text>
              </GridItem>
              <GridItem
                colSpan={{base: 1, lg: 2}}
                mb={{base: '7px', lg: '10px'}}
                p="24px"
                border="1px solid #EAECF0"
                borderRadius={'2px'}
                boxShadow={
                  '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'
                }
              >
                <SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: '15px', lg: '20px'}}>
                  <GridItem colSpan={{base: 1, lg: 2}}>
                    <FormInput
                      label="Residential Address"
                      type="text"
                      onChange={formik.handleChange('address')}
                      value={formik.values.address}
                      placeholder="Enter residential address"
                    />
                  </GridItem>
                  <GridItem colSpan={1} display={{base: 'flex', lg: 'none'}}>
                    <FormInput
                      label="Company Address"
                      type="text"
                      onChange={formik.handleChange('company_address')}
                      value={formik.values.company_address}
                      placeholder="Enter company address"
                    />
                  </GridItem>
                  <GridItem colSpan={{base: 1, lg: 2}}>
                    <FormLabel fontSize={'13px'} color="#4B4B4B" fontWeight={500}>
                      Upload ID
                    </FormLabel>
                    <Documents />
                  </GridItem>
                </SimpleGrid>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </Box>
      )}

      <Button
        float="right"
        onClick={handleUpdate}
        isLoading={profileQuery?.isLoading || mutation.isLoading}
        mt="20px"
        color="white"
        bg="#DDB057"
        w={{base: 'full', lg: '200px'}}
        type="submit"
        h="48px"
        fontSize={16}
      >
        Update
      </Button>
    </Box>
  );
};

export default Profile;
