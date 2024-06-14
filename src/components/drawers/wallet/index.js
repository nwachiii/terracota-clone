import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useMediaQuery,
} from "@chakra-ui/react";
import WalletContent from "./walletContent";
import WithdrawalWallet from "./withdrawal";
import DepositWallet from "./deposit";
import MobileWalletHeader from "./mobileWHeader";
import { Footer } from "../../layout/footer";

const Wallet = ({ isWalOpen, onWalClose, avatar, onDrawerOpen }) => {
  const [page, setPage] = useState("wallet");
  const [step, setStep] = useState("method");
  const [isNotMobile] = useMediaQuery("(min-width: 768px)");
  return (
    <Drawer
      onCloseComplete={() => setPage("wallet")}
      blockScrollOnMount={true}
      isOpen={isWalOpen}
      onClose={onWalClose}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerContent
        maxW={{ base: "full", lg: "400px" }}
        p="0"
        bg="background"
        top={{ base: 0, lg: "24px !important" }}
        right={{ base: "0", lg: "24px !important" }}
        w="full"
        h={"full"}
        maxH={{ base: "100vh", lg: "600px" }}
      >
        <MobileWalletHeader
          onDrawerClose={onWalClose}
          step={step}
          setPage={setPage}
          setStep={setStep}
          activePage={page}
          onDrawerOpen={onDrawerOpen}
        />
        {page === "wallet" && (
          <WalletContent
            avatar={avatar}
            setPage={setPage}
            onWalClose={onWalClose}
          />
        )}
        {page === "deposit" && (
          <DepositWallet
            step={step}
            setStep={setStep}
            setPage={setPage}
            onWalClose={onWalClose}
          />
        )}
        {page === "withdrawal" && (
          <WithdrawalWallet setPage={setPage} onWalClose={onWalClose} />
        )}
      {!isNotMobile && <Footer/>}
      </DrawerContent>
    </Drawer>
  );
};

export default Wallet;
