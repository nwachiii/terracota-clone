import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchAllUnits, fetchFractionalInfo} from '../../../api/listing';
import Price from './fractionalModalComponents/price';
import Disclosure from './fractionalModalComponents/disclosure';
import PaymentModal from '../../../components/payment';
import EnterFraction from '../fractional_details/enterFraction';

const FractionalModal = ({fractionalModal, info}) => {
  const [step, setStep] = useState('disclosure');
  const [amountToPay, setAmountToPay] = useState(0);
  const [fractions, setFractions] = useState('');

  const {data: allUnits} = useQuery(
    ['fetchAllUnits', info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    {enabled: !!info?.id}
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(item => item?.is_fraction_sale_available);

  const {data: fractionalDetail} = useQuery(
    ['fractional', unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    {enabled: !!unitThatWasFractionalized?.id}
  );
  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;

  const onCloseModal = () => {
    fractionalModal?.onClose();
    setFractions('');
    setStep('disclosure');
  };

  const paymentDetails = {
    bundle_id: unitThatWasFractionalized?.id,
    amount_to_pay: Number(fractions * unitData?.price_per_fraction),
    no_of_fractions: Number(fractions),
  };

  //
  return (
    <>
      {step === 'disclosure' ? (
        <Disclosure
          setStep={setStep}
          fractionalModal={fractionalModal}
          onCloseModal={onCloseModal}
          fractionalData={fractionalData}
        />
      ) : step === 'price' ? (
        <Price
          setStep={setStep}
          setAmountToPay={setAmountToPay}
          fractionalModal={fractionalModal}
          fractionalData={fractionalData}
          onCloseModal={onCloseModal}
          fractions={fractions}
          setFractions={setFractions}
        />
      ) : (
        <PaymentModal
          isFractional
          paymentType={'asset'}
          amountToPay={Number(fractions * unitData?.price_per_fraction)}
          modal={fractionalModal}
          paymentDetails={paymentDetails}
          setStep={setStep}
          onCloseModal={onCloseModal}
          setFractions={setFractions}
        />
      )}
    </>
  );
};

export default FractionalModal;
