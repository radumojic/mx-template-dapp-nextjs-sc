import { useState } from 'react';

import { signAndSendTransactions } from '@/helpers';
import { EndpointDefinition, TypedValue } from '@/lib';
import {
  InteractionForm,
  MutateModalInitialValuesType,
  getCallContractTransaction,
  useSCExplorerContext,
  useTrackTransaction
} from '@/lib/sdkDappScExplorer';

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
  const [sessionId, setSessionId] = useState<string>();

  const { txProcessingFinished } = useTrackTransaction(sessionId);
  const isTransactionPending = Boolean(sessionId) && !txProcessingFinished;

  const onSubmit = async (values: MutateModalInitialValuesType) => {
    const { tokens, gasLimit } = values;

    if (!contractAddress || !deployedContractDetails) {
      setGeneralError(
        'Smart Contract Address is required and the Contract must be Deployed on the current Network'
      );
      return;
    }

    try {
      setIsLoading(true);
      setGeneralError(undefined);
      setSessionId(undefined);

      const contractTransaction = await getCallContractTransaction({
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

      const { sessionId: mutateSessionId } = await signAndSendTransactions({
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
    } catch (error) {
      console.error('Send Contract Mutation Error:', error);
      setGeneralError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn || !endpoint || !args) {
    return null;
  }

  return (
    <InteractionForm
      endpoint={endpoint}
      isMutate={true}
      onSubmit={onSubmit}
      generalError={generalError}
      isLoading={isLoading || isTransactionPending}
      tokens={accountTokens}
      buttonText={`Send ${endpoint.name} Transaction`}
    />
  );
};
