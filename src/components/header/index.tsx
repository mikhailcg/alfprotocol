import React, {
  useCallback, useMemo, MouseEvent, useState, useEffect,
} from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { Modal } from '../common';
import WalletInfo from './walletInfo';
import logo from '../../assets/images/logo.svg';
import './header.scss';

const Header = () => {
  const { publicKey, wallets, select } = useWallet();
  const { connection } = useConnection();
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  const getAccountInfo = async () => {
    if (publicKey) {
      const info = await connection.getAccountInfo(publicKey);
      if (info) {
        setBalance(info.lamports);
      }
    }
  };

  useEffect(() => {
    if (publicKey && connection) {
      setShowWalletInfo(false);
      getAccountInfo();
    }
  }, [publicKey, connection]);

  const handleConnect = useCallback((_event: MouseEvent<HTMLButtonElement>, walletName: WalletName) => {
    const { readyState = WalletReadyState.NotDetected } = wallets
      .find(({ adapter }) => adapter.name === walletName) || {};
    if (readyState === WalletReadyState.NotDetected) {
      console.warn('wallet not detected');
      return;
    }
    select(walletName);
  }, [wallets, select]);

  return (
    <header>
      <img src={logo} alt="logo" />
      {address ? (
        <button type="button" onClick={() => setShowWalletInfo(!showWalletInfo)}>
          {`${address.substring(0, 11)}...`}
        </button>
      )
        : (
          <button type="button" onClick={(event) => handleConnect(event, 'Phantom' as WalletName)}>
            Connect wallet
          </button>
        )}
      {showWalletInfo && publicKey
        ? (
          <Modal onClose={() => setShowWalletInfo(false)}>
            <WalletInfo publicKey={publicKey} balance={balance} />
          </Modal>
        )
        : null}
    </header>
  );
};

export default Header;
