'use client';
import { contractAddress } from '@/config';
import pingPongAbi from '@/contracts/ping-pong.abi.json';
import { useGetSmartContractDetails } from '@/hooks';
import { useGetScExplorerNetworkConfig } from '@/hooks/useGetScExplorerNetworkConfig';
import { useGetAccountInfo, useGetLoginInfo } from '@/lib';
import {
  AppContextProvider,
  RawAbiType
} from '@/lib/sdkDappScExplorer';
import { scExplorerClassNames } from '@/localConstants';

import { Endpoints } from './components';

export const SmartContractUI = () => {
  const { smartContractDetails, isLoading } = useGetSmartContractDetails();
  const networkConfig = useGetScExplorerNetworkConfig();

  if (isLoading) {
    return <></>;
  }

  return (
    <AppContextProvider
      accountConsumerHandlers={{
        useGetLoginInfo,
        useGetAccountInfo
      }}
      smartContract={{
        contractAddress,
        // the ABI artifact declares an empty `types` array, RawAbiType expects a map
        abi: pingPongAbi as unknown as RawAbiType,
        deployedContractDetails: smartContractDetails
      }}
      config={{
        canMutate: true,
        canLoadAbi: true,
        canDeploy: true,
        canUpgrade: true,
        canDisplayContractDetails: true
      }}
      networkConfig={networkConfig}
      customClassNames={scExplorerClassNames}
    >
      <Endpoints />
    </AppContextProvider>
  );
};
