'use client';
import { useMemo } from 'react';

import { environment } from '@/config';
import { useGetNetworkConfig } from '@/lib';
import { NetworkType, getNetworkEntrypoint } from '@/lib/sdkDappScExplorer';

/**
 * Builds the `networkConfig` expected by the sdk-dapp-sc-explorer providers out
 * of the network the dApp was initialized with.
 *
 * Deliberately not re-exported from `@/hooks`: sdk-dapp-sc-explorer touches
 * `document` on import, so it must only reach modules that are loaded client
 * side (see the dynamic imports in the dashboard page).
 */
export const useGetScExplorerNetworkConfig = (): NetworkType => {
  const { network } = useGetNetworkConfig();

  return useMemo(() => {
    // getNetworkEntrypoint only reads `environment` and `apiAddress`, but its
    // signature asks for the full (yet to be built) NetworkType.
    const partialNetwork = {
      environment,
      apiAddress: network.apiAddress
    } as NetworkType;

    return {
      ...partialNetwork,
      networkEntrypoint: getNetworkEntrypoint({ network: partialNetwork })
    };
  }, [network.apiAddress]);
};
