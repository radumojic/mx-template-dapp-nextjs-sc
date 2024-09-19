'use client';
import { AppContextProvider } from '@multiversx/sdk-dapp-sc-explorer/contexts';
import { useGetLoginInfo, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import json from '@/contracts/ping-pong.abi.json';

import { useGetSmartContractDetails } from './hooks';
import { environment, contractAddress } from '@/config';

import { Endpoints } from './components';

export const SmartContractUI = () => {
  const { smartContractDetails, isLoading } = useGetSmartContractDetails();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <AppContextProvider
        accountConsumerHandlers={{
          useGetLoginInfo,
          useGetAccountInfo
        }}
        smartContract={{
          contractAddress,
          abi: json,
          deployedContractDetails: smartContractDetails
        }}
        config={{
          canMutate: true,
          canLoadAbi: true,
          canDeploy: true,
          canUpgrade: true,
          canDisplayContractDetails: true
        }}
        networkConfig={{ environment }}
      >
        <Endpoints />
      </AppContextProvider>
    </div>
  );
};
