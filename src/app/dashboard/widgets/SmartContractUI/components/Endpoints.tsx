import { useSCExplorerContext } from '@multiversx/sdk-dapp-sc-explorer/contexts/SCExplorerContextProvider';
import { EndpointRead } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints/ContractEndpoint/components/EndpointRead';
import { EndpointDefinition } from '@multiversx/sdk-core/out/smartcontracts';
import { ContractEndpointMutabilityEnum } from '@multiversx/sdk-dapp-sc-explorer/types';

export const Endpoints = () => {
  const { smartContract } = useSCExplorerContext();

  const endpoints = smartContract?.abiRegistry
    ?.endpoints as EndpointDefinition[];

  if (!(endpoints && endpoints.length > 0)) {
    return null;
  }

  return (
    <div>
      {endpoints
        .filter(
          (endpoint) =>
            endpoint.modifiers.mutability ===
            ContractEndpointMutabilityEnum.readonly
        )
        .map((endpoint: EndpointDefinition) => {
          return <EndpointRead endpoint={endpoint} key={endpoint.name} />;
        })}
    </div>
  );
};
