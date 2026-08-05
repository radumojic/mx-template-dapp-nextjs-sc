'use client';
import { contractAddress } from '@/config';
import pingPongAbi from '@/contracts/ping-pong.abi.json';
import { useGetSmartContractDetails } from '@/hooks';
import { useGetScExplorerNetworkConfig } from '@/hooks/useGetScExplorerNetworkConfig';
import { useGetAccountInfo, useGetLoginInfo } from '@/lib';
import {
  ContractEndpoints,
  ContractEndpointMutabilityEnum,
  RawAbiType,
  ScExplorerContainer
} from '@/lib/sdkDappScExplorer';
import { scExplorerClassNames } from '@/localConstants';

// prettier-ignore
const styles = {
  smartContractDefaultUiContainer: 'smart-contract-default-ui-container mx-sdk-sc flex flex-col gap-6 w-full'
} satisfies Record<string, string>;

export const SmartContractDefaultUI = () => {
  const { smartContractDetails, isLoading } = useGetSmartContractDetails();
  const networkConfig = useGetScExplorerNetworkConfig();

  if (isLoading) {
    return <></>;
  }

  return (
    <ScExplorerContainer
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
      className={styles.smartContractDefaultUiContainer}
    >
      <ContractEndpoints mutability={ContractEndpointMutabilityEnum.readonly} />
      <ContractEndpoints mutability={ContractEndpointMutabilityEnum.mutable} />
    </ScExplorerContainer>
  );
};
