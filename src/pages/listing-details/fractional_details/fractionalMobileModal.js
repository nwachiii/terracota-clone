import React, {useState} from 'react';
import PaymentModal from '../../../components/payment';
import EnterFraction from './enterFraction';

const FractionalMobileModal = ({fractionalModal, fractionalData}) => {
  const [step, setStep] = useState('enterFraction');
  const [amountToPay, setAmountToPay] = useState(0);
  const [fractions, setFractions] = useState('');

  const unitData = fractionalData?.fraction_data?.unit;

  const onCloseModal = () => {
    fractionalModal?.onClose();
    setFractions('');
    setStep('enterFraction');
  };

  const paymentDetails = {
    bundle_id: unitData?.id,
    amount_to_pay: Number(fractions * unitData?.price_per_fraction),
    no_of_fractions: Number(fractions),
  };

  return (
    <>
      {step === 'enterFraction' ? (
        <EnterFraction
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

export default FractionalMobileModal;
