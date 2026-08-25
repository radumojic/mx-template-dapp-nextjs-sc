import { useEffect } from 'react';

import {
  ContractEndpointMutabilityEnum,
  EndpointRead,
  useGetAccountTokens,
  useGetContractEndpointCount,
  useGetContractEndpoints,
  useSCExplorerContext
} from '@/lib/sdkDappScExplorer';

import { EndpointMutate } from './EndpointMutate';

// prettier-ignore
const styles = {
  endpointsContainer: 'endpoints-container mx-sdk-sc flex flex-col gap-6 w-full',
  endpointsSection: 'endpoints-section flex flex-col gap-4',
  endpointsSectionTitle: 'endpoints-section-title text-lg font-medium text-primary',
  endpoint: 'endpoint flex flex-col gap-3 rounded-xl border border-secondary p-4',
  endpointTitle: 'endpoint-title flex justify-between items-center text-primary font-medium',
  endpointIndex: 'endpoint-index text-secondary text-sm'
} satisfies Record<string, string>;

export const Endpoints = () => {
  const getAccountTokens = useGetAccountTokens();
  const { accountInfo } = useSCExplorerContext();
  const { isLoggedIn } = accountInfo;

  const readEndpoints = useGetContractEndpoints({
    mutability: ContractEndpointMutabilityEnum.readonly
  });

  const mutableEndpoints = useGetContractEndpoints({
    mutability: ContractEndpointMutabilityEnum.mutable
  });

  const { readEndpointsCount, writeEndpointsCount } =
    useGetContractEndpointCount();

  useEffect(() => {
    // without an address the tokens call hits /accounts//tokens and 404s
    if (isLoggedIn && writeEndpointsCount > 0) {
      getAccountTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, writeEndpointsCount]);

  if (readEndpoints.length === 0 && mutableEndpoints.length === 0) {
    return null;
  }

  return (
    <div className={styles.endpointsContainer}>
      {readEndpointsCount > 0 && (
        <div className={styles.endpointsSection}>
          <h3 className={styles.endpointsSectionTitle}>
            Read endpoints ({readEndpointsCount})
          </h3>

          {readEndpoints.map((endpoint, index) => (
            <div className={styles.endpoint} key={`read-${endpoint.name}`}>
              <div className={styles.endpointTitle}>
                {endpoint.name}
                <span className={styles.endpointIndex}>
                  {index + 1}/{readEndpointsCount}
                </span>
              </div>

              <EndpointRead endpoint={endpoint} />
            </div>
          ))}
        </div>
      )}

      {writeEndpointsCount > 0 && (
        <div className={styles.endpointsSection}>
          <h3 className={styles.endpointsSectionTitle}>
            Mutable endpoints ({writeEndpointsCount})
          </h3>

          {mutableEndpoints.map((endpoint, index) => (
            <div className={styles.endpoint} key={`mutable-${endpoint.name}`}>
              <div className={styles.endpointTitle}>
                {endpoint.name}
                <span className={styles.endpointIndex}>
                  {index + 1}/{writeEndpointsCount}
                </span>
              </div>

              <EndpointMutate endpoint={endpoint} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
