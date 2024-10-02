import React, { useState } from 'react';

import { EndpointDefinition, TypedValue } from '@multiversx/sdk-core/out';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
import { useSCExplorerContext } from '@multiversx/sdk-dapp-sc-explorer/contexts';
import { getCallContractTransaction } from '@multiversx/sdk-dapp-sc-explorer/helpers';
import { InteractionForm } from '@multiversx/sdk-dapp-sc-explorer/components/Forms/InteractionForm';
import { MutateModalInitialValuesType } from '@multiversx/sdk-dapp-sc-explorer/components/Forms/types';
import { useTrackTransactionStatus } from '@/hooks';

export const EndpointMutateForm = ({
  endpoint,
  args
}: {
  endpoint: EndpointDefinition;
  args?: TypedValue[];
}) => {
  const { accountInfo, smartContract, userActionsState } =
    useSCExplorerContext();

  const { accountTokens } = userActionsState;
  const { isLoggedIn, address: callerAddress } = accountInfo;
  const { abiRegistry, contractAddress, deployedContractDetails } =
    smartContract;
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string>();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const transactionStatus = useTrackTransactionStatus({
    transactionId: sessionId
  });

  const onSubmit = async (values: MutateModalInitialValuesType) => {
    try {
      setIsLoading(true);
      setSessionId(null);
      const { tokens, gasLimit } = values;
      if (contractAddress && deployedContractDetails) {
        const contractTransaction = getCallContractTransaction({
          contractAddress,
          callerAddress,
          abiRegistry,
          func: endpoint?.name,
          args,
          userGasLimit: Number(gasLimit),
          tokens
        });

        if (!contractTransaction) {
          throw new Error(`Unable to build ${endpoint?.name} Transaction`);
        }

        await refreshAccount();
        const { error, sessionId: mutateSessionId } = await sendTransactions({
          transactions: [contractTransaction],
          transactionsDisplayInfo: {
            processingMessage: `Processing ${endpoint?.name} Transaction`,
            errorMessage: `An error has occured during ${endpoint?.name} Transaction`,
            successMessage: `${endpoint?.name} Transaction successful`
          }
        });
        if (mutateSessionId) {
          setSessionId(mutateSessionId);
        }
        if (error) {
          setGeneralError(String(error));
        }
      } else {
        setGeneralError(
          'Smart Contract Address is required and the Contract must be Deployed on the current Network'
        );
      }
    } catch (error) {
      console.error('Send Contract Mutation Error:', error);
      setGeneralError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const isNotReady =
    !isLoggedIn || endpoint === undefined || args === undefined;

  if (isNotReady) {
    return true;
  }

  return (
    <InteractionForm
      endpoint={endpoint}
      isMutate={true}
      onSubmit={onSubmit}
      generalError={generalError}
      isLoading={isLoading || transactionStatus?.isPending}
      tokens={accountTokens}
      buttonText={`Send ${endpoint.name} Transaction`}
    />
  );
};
