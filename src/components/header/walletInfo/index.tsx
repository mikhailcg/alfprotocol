import React, { useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { convertFromLamports } from '../../../utils/formatter';
import { disconnectWallet } from '../../../actions/wallet';
import './walletInfo.scss';

interface Props {
  publicKey: PublicKey;
  balance: number;
}

const WalletInfo: React.FC<Props> = (props: Props) => {
  const { publicKey, balance } = props;
  const { disconnect } = useWallet();
  const address = publicKey.toBase58();

  const copyAddress = useCallback(async () => {
    await navigator.clipboard.writeText(publicKey?.toBase58() || '');
  }, [publicKey]);

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    disconnectWallet();
  }, [disconnect]);

  return (
    <div className="wallet-info">
      <table>
        <tbody>
          <tr>
            <th scope="row">Address</th>
            <td>
              {address}
              {' '}
              <span onClick={copyAddress} aria-hidden="true">(copy)</span>
            </td>
          </tr>
          <tr>
            <th scope="row">Balance</th>
            <td>{convertFromLamports(balance)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleDisconnect} type="button">Disconnect wallet</button>
    </div>
  );
};

export default WalletInfo;
