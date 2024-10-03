import React, { useState } from 'react';
import {
  NativeSerializer,
  EndpointDefinition,
  TypedValue
} from '@multiversx/sdk-core/out';
import { EndpointForm } from '@multiversx/sdk-dapp-sc-explorer/components';
import { useSCExplorerContext } from '@multiversx/sdk-dapp-sc-explorer/contexts';
import { useGetAccountTokens } from '@multiversx/sdk-dapp-sc-explorer/hooks';
import { ContractEndpointMutabilityEnum } from '@multiversx/sdk-dapp-sc-explorer/types';

import { EndpointMutateForm } from './EndpointMutateForm';

export const EndpointMutate = ({
  endpoint
}: {
  endpoint: EndpointDefinition;
}) => {
  const getAccountTokens = useGetAccountTokens();
  const { support } = useSCExplorerContext();
  const { canMutate } = support;
  const { modifiers } = endpoint;
  const { mutability } = modifiers;

  const hasInputs = endpoint?.input && endpoint.input.length > 0;

  const [isEndpointLoading, setIsEndpointLoading] = useState(false);
  const [endpointError, setEndpointError] = useState<string>();
  const [args, setArgs] = useState<TypedValue[]>();
  const [isTxReady, setIsTxReady] = useState(!hasInputs);

  const handleEndpointSubmit = async (nativeValues: unknown[]) => {
    setEndpointError(undefined);
    setIsEndpointLoading(true);
    setIsTxReady(false);
    try {
      const typedValues = NativeSerializer.nativeToTypedValues(
        nativeValues || [],
        endpoint
      );
      setArgs(typedValues);
      if (modifiers?.isPayable()) {
        await getAccountTokens(modifiers.payableInTokens ?? []);
      }
      setIsTxReady(true);
    } catch (error) {
      setEndpointError(String(error));
    } finally {
      setIsEndpointLoading(false);
      return;
    }
  };

  if (!(canMutate && mutability === ContractEndpointMutabilityEnum.mutable)) {
    return null;
  }

  return (
    <>
      {hasInputs && (
        <EndpointForm
          onSubmit={handleEndpointSubmit}
          isLoading={isEndpointLoading}
          generalError={endpointError}
          buttonText='Send Transaction'
          endpoint={endpoint}
        />
      )}
      {isTxReady && (
        <EndpointMutateForm endpoint={endpoint} args={hasInputs ? args : []} />
      )}
    </>
  );
};
