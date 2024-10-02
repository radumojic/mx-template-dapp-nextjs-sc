'use client';
import { ScExplorerContainer } from '@multiversx/sdk-dapp-sc-explorer/containers/ScExplorerContainer';
import { ContractEndpoints } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints';
import { ContractEndpointMutabilityEnum } from '@multiversx/sdk-dapp-sc-explorer/types';
import { useGetLoginInfo, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import json from '@/contracts/ping-pong.abi.json';

import { useGetSmartContractDetails } from './hooks';
import { environment, contractAddress } from '@/config';

export const SmartContractDefaultUI = () => {
  const { smartContractDetails, isLoading } = useGetSmartContractDetails();

  if (isLoading) {
    return <></>;
  }

  const customClassNames = {
    wrapperClassName: 'bg-slate-200 flex flex-col gap-4 max-w-3xl w-[740px] ',
    cardClassName:
      'flex flex-col flex-1 rounded-xl bg-white p-6 justify-center', //endpoint
    cardHeaderClassName: 'mb-5', // row 1
    cardBodyClassName: 'flex items-center w-full', // row 2
    listClassName: '',
    listItemClassName: 'mb-4',
    badgeClassName: '', // write payable view interactive
    badgePrimaryClassName: 'text-gray-400 text-sm', // interactive only owner
    badgeSecondaryClassName:
      'border rounded-lg border-gray-200 text-gray-400 text-sm', // write payable view
    badgeActiveClassName: '',
    badgeInactiveClassName: '',
    badgeFilledClassName: '',
    badgeIconClassName: '', //icons
    cardItemClassName: '',
    cardItemIconClassName: '',
    cardItemTitleClassName: '',
    cardItemValueClassName: '',
    cardItemContainerClassName: '',
    buttonClassName: 'hidden', //expand all reset
    buttonPrimaryClassName:
      'rounded-lg px-3 py-2 text-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed mt-3', // send transac query
    buttonSecondaryClassName: '',
    inputClassName:
      'text-sm border border-gray-200 bg-gray-100 rounded-xl overflow-auto p-3.5 w-full', // input fields
    inputInvalidClassName: '',
    inputInvalidFeedbackClassName: '',
    inputGroupClassName: '', // next to input & address
    inputGroupAppendClassName: '', // address info
    inputGroupPrependClassName: '',
    selectClassName: '',
    tabClassName: '',
    activeTabClassName: ''
  };

  return (
    <div className='flex flex-col gap-6'>
      <ScExplorerContainer
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
        customClassNames={customClassNames}
        className='mx-sdk-sc'
      >
        <ContractEndpoints
          mutability={ContractEndpointMutabilityEnum.readonly}
        />
        <ContractEndpoints
          mutability={ContractEndpointMutabilityEnum.mutable}
        />
      </ScExplorerContainer>
    </div>
  );
};
