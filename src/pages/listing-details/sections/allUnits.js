import {Box, SimpleGrid, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '../../../api/listing';
import {CardTwo} from '../../../components/cards';
import {Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import ErrorState from '../../../components/appState/error-state';
import {formatToCurrency} from '../../../utils';
import React, {useMemo} from 'react';

const AllUnits = ({info}) => {
	const router = useRouter();
	const projectId = info?.id;

	const {data, isError, isLoading} = useQuery(['fetchAllUnits', projectId], () => fetchAllUnits(parseInt(projectId)), {enabled: !!projectId});

	// const Units = useMemo(() => {
	// 	return data?.data?.results?.map((item) => (
	// 		<CardTwo
	// 			key={item?.id}
	// 			price={item?.price}
	// 			size={item?.unit_size}
	// 			isFraction={item?.is_fraction_sale_available}
	// 			is_fraction_sale_available={item?.is_fraction_sale_available}
	// 			unitLeft={item?.total_quantity - item?.total_purchased_units}
	// 			image={item?.photos[0]?.photo}
	// 			title={item?.unit_title}
	// 			subtitle={formatToCurrency(item?.price)}
	// 			onClickCard={() =>
	// 				router.push({
	// 					pathname: `/listing-details/units/${id}`,
	// 					query: {projectId: projectId},
	// 				})
	// 			}
	// 		/>
	// 	));
	// }, [data, router, projectId]);

	return (
		<Box mt={{base: '20px', md: '50px'}} w={{base: '100%', md: '100%'}} mx='auto'>
			<Text fontSize={{base: '16px', lg: '24px'}} fontWeight={400} color='matador_text.100' className='gilda-display-bold'>
				Available Units
			</Text>
			<Box w={{base: '43px', md: '70px'}} mt='4px' borderBottom='1.8px solid' borderColor={`matador_text.200` || `#191919`} />

			{isLoading ? (
				<Spinner noAbsolute />
			) : isError ? (
				<ErrorState />
			) : (
				<SimpleGrid mt={{base: '15px', md: '26px'}} gap={{base: '16px', md: '24px', '2xl': '54px'}} columns={{base: 1, md: 2, lg: 3}} justify={'center'} alignItems={'center'}>
					{data?.data?.results?.map((item, idx) => (
						<CardTwo
							key={item?.id}
							price={item?.price}
							size={item?.unit_size}
							isFraction={item?.is_fraction_sale_available}
							is_fraction_sale_available={item?.is_fraction_sale_available}
							unitLeft={item?.total_quantity - item?.total_purchased_units}
							image={item?.photos[0]?.photo}
							title={item?.unit_title}
							subtitle={formatToCurrency(item?.price)}
							onClickCard={() =>
								router.push({
									pathname: `/listing-details/units/${item?.id}`,
									query: {projectId: projectId},
								})
							}
						/>
					))}
				</SimpleGrid>
			)}
		</Box>
	);
};

export default AllUnits;
