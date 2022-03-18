import { Connection, PublicKey } from '@solana/web3.js';
import { store } from '../utils/store';
import {
  loading, success, failed, disconnect,
} from '../slices/wallet';

export const getWalletInfo = async (publicKey: PublicKey, connection: Connection) => {
  store.dispatch(loading());
  const info = await connection.getAccountInfo(publicKey);
  if (info) {
    store.dispatch(success(info));
  } else {
    console.error('Cannot get wallet information');
    store.dispatch(failed('Cannot get wallet information'));
  }
};

export const disconnectWallet = () => store.dispatch(disconnect());
