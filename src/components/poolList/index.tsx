import React, { useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Pool as PoolInterface } from '../../sdk';
import { getPools } from '../../actions/pools';
import { useAppSelector } from '../../hooks';
import { LoadingType } from '../../types/global';
import Pool from './pool';
import NewPool from './newPool';
import './poolList.scss';

const PoolList = () => {
  const { publicKey } = useWallet();

  const poolsStore = useAppSelector((state) => state.pools);
  const walletStore = useAppSelector((state) => state.wallet);
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  useEffect(() => {
    getPools();
  }, []);

  return (
    <div className="pool-list">
      {poolsStore.loading === LoadingType.LOADING ? <p>Loading pools...</p> : (
        <>
          <div className="pool-list-title">
            <h1>List of pools</h1>
            {address ? (
              <NewPool />
            ) : null}
          </div>
          {poolsStore.data.map((p: PoolInterface) => (
            (
              <Pool
                pool={p}
                key={p.publicKey}
                wallet={walletStore.data}
                address={address}
              />
            )
          ))}
        </>
      )}
    </div>
  );
};

export default PoolList;
