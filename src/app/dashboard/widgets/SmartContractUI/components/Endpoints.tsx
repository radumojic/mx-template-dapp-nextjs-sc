import { EndpointRead } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints/ContractEndpoint/components/EndpointRead';
import { ContractEndpointMutabilityEnum } from '@multiversx/sdk-dapp-sc-explorer/types';
import {
  useGetContractEndpoints,
  useGetContractEndpointCount,
  useGetAccountTokens
} from '@multiversx/sdk-dapp-sc-explorer/hooks';

import { Card } from '@/components/Card';

import { EndpointMutate } from './EndpointMutate';
import { useEffect } from 'react';

export const Endpoints = () => {
  const getAccountTokens = useGetAccountTokens();
  const readEndpoints = useGetContractEndpoints({
    mutability: ContractEndpointMutabilityEnum.readonly
  });
  const mutableEndpoints = useGetContractEndpoints({
    mutability: ContractEndpointMutabilityEnum.mutable
  });

  const { readEndpointsCount, writeEndpointsCount } =
    useGetContractEndpointCount();

  const handleEndpointSubmit = async (writeEndpointsCount?: number) => {
    if (writeEndpointsCount && writeEndpointsCount > 0) {
      await getAccountTokens();
    }
  };

  useEffect(() => {
    handleEndpointSubmit(writeEndpointsCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeEndpointsCount]);

  if (!([...readEndpoints, ...mutableEndpoints].length > 0)) {
    return null;
  }

  return (
    <div className='mx-sdk-sc flex flex-col gap-6 max-w-3xl w-full'>
      {readEndpointsCount && (
        <>
          <div className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'>
            Read Endpoints: {readEndpointsCount}
          </div>
          {readEndpoints.map((endpoint, index) => (
            <Card
              title={endpoint.name ?? ''}
              description={`${index + 1}/${readEndpointsCount}`}
              reference='https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook-v13#contract-abis'
              anchor={`${endpoint.name}-${index}`}
              key={`${endpoint.name}-${index}`}
            >
              <EndpointRead endpoint={endpoint} />
            </Card>
          ))}
        </>
      )}

      <br />

      {writeEndpointsCount && (
        <>
          <div className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'>
            Mutable Endpoints: {writeEndpointsCount}
          </div>
          {mutableEndpoints.map((endpoint, index) => (
            <Card
              title={endpoint.name ?? ''}
              description={`${index + 1}/${writeEndpointsCount}`}
              reference='https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook-v13#contract-abis'
              anchor={endpoint.name ?? ''}
              key={`${endpoint.name}-${index}`}
            >
              <EndpointMutate endpoint={endpoint} key={endpoint.name} />
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
