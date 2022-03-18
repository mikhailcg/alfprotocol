import { Connection, PublicKey } from '@solana/web3.js';
import { store } from '../utils/store';
import {
  loading, success, failed,
} from '../slices/tokenAccounts';

export const getTokenAccountInfo = async (publicKey: PublicKey, connection: Connection, programId: PublicKey) => {
  store.dispatch(loading());
  const info = await connection.getParsedTokenAccountsByOwner(publicKey, { programId });
  if (info) {
    store.dispatch(success(info?.value || []));
  } else {
    console.error('Cannot get accounts information');
    store.dispatch(failed('Cannot get accounts information'));
  }
};

export default { getTokenAccountInfo };
