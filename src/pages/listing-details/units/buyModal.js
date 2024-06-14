import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchAllBundlePaymentPlan } from '../../../api/listing'
import Summary from './buyModalComponents/summary'
import Plan from './buyModalComponents/plan'
import Terms from './buyModalComponents/terms'
import Type from './buyModalComponents/type'
import PaymentModal from '../../../components/payment'
import InviteForm from './buyModalComponents/inviteForm'
import Invitees from './buyModalComponents/invitees'
import InviteMore from './buyModalComponents/inviteMore'
import InviteSummary from './buyModalComponents/inviteSummary'
import Breakdown from './buyModalComponents/breakdown'

const BuyModal = ({ buyModal, unitData }) => {
  const [step, setStep] = useState('type');
  const [amountToPay, setAmountToPay] = useState(0);
  const [fullPayment, setFullPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [coOwnerDetails, setCoOwnerDetails] = useState(null);
  const [listCoOwner, setListCoOwner] = useState([]);
  const [returnedData, setReturnedData] = useState(null);

  const { data, isLoading } = useQuery(['payment_plan', unitData?.id], () => fetchAllBundlePaymentPlan(unitData?.id));
  const PAYMENT_PLAN_DATA = data && data?.data?.results;

  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  }, [PAYMENT_PLAN_DATA])

  const onCloseModal = () => {
    setSelectedPlan(null);
    buyModal?.onClose();
    setStep('type');
    setFullPayment(false);

    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  }

  const paymentDetails = {
    paymentplan_id: selectedPlan?.id,
    bundle_id: selectedPlan?.bundle?.id || unitData?.id,
    type: 'WHOLE',
  };


  return (
    <>
      {step === 'type' ? (
        <Type
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
        />
      ) : step === 'terms' ? (
        <Terms
          setAmountToPay={setAmountToPay}
          fullPayment={fullPayment}
          unitData={unitData}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
        />
      ) : step === 'plan' ? (
        <Plan
          planLoading={isLoading}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
        />
      ) : step === 'summary' ? (
        <Summary
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
        />
      ) : step === 'breakdown' ? (
        <Breakdown
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          step={step}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
        />
      ) : step === 'inviteSummary' ? (
        <InviteSummary
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
          coOwnerDetails={coOwnerDetails}
          amountToPay={amountToPay}
          paymentDetails={paymentDetails}
          setReturnedData={setReturnedData}
        />
      ) : step === 'inviteForm' ? (
        <InviteForm
          setListCoOwner={setListCoOwner}
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
          coOwnerDetails={coOwnerDetails}
          setCoOwnerDetails={setCoOwnerDetails}
        />
      ) : step === 'invitees' ? (
        <Invitees
          setListCoOwner={setListCoOwner}
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
          listCoOwner={listCoOwner}
        />
      ) : step === 'inviteMore' ? (
        <InviteMore
          listCoOwner={listCoOwner}
          setListCoOwner={setListCoOwner}
          unitData={unitData}
          setAmountToPay={setAmountToPay}
          PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
          fullPayment={fullPayment}
          setFullPayment={setFullPayment}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
          selectedPlan={selectedPlan}
          buyModal={buyModal}
          onCloseModal={onCloseModal}
          coOwnerDetails={coOwnerDetails}
          setCoOwnerDetails={setCoOwnerDetails}
          returnedData={returnedData}
        />
      ) : (
        <PaymentModal
          fullPayment={fullPayment}
          paymentType={'asset'}
          selectedPlan={selectedPlan}
          amountToPay={amountToPay}
          modal={buyModal}
          paymentDetails={paymentDetails}
          setStep={setStep}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  )
}

export default BuyModal