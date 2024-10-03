import {
  Account,
  SignMessage,
  NativeAuth,
  BatchTransactions,
  Transactions,
  SmartContractUI
  // SmartContractDefaultUI
} from './widgets';
import { AuthRedirectWrapper } from '@/wrappers';
import { ClientHooks } from '@/components/ClientHooks';
import { Widget } from './components';
import { WidgetType } from '@/types/widget.types';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  // {
  //   title: 'Smart Contract',
  //   widget: SmartContractUI,
  //   description: 'Smart Contract Interactions',
  //   reference:
  //     'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/',
  //   anchor: 'smart-contract'
  // },
  // {
  //   title: 'Smart Contract Default',
  //   widget: SmartContractDefaultUI,
  //   description: 'Smart Contract Interactions',
  //   reference:
  //     'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/',
  //   anchor: 'smart-contract'
  // },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1',
    anchor: 'sign-message'
  },
  {
    title: 'Native auth',
    widget: NativeAuth,
    description:
      'A secure authentication token can be used to interact with the backend',
    reference: 'https://github.com/multiversx/mx-sdk-js-native-auth-server'
  },
  {
    title: 'Batch Transactions',
    widget: BatchTransactions,
    description:
      'A secure authentication token can be used to interact with the backend',
    reference:
      'https://github.com/multiversx/mx-sdk-dapp#sending-transactions-synchronously-in-batches',
    anchor: 'batch-transactions'
  },
  {
    title: 'Transactions (All)',
    widget: Transactions,
    description: 'List transactions for the connected account',
    reference:
      'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export default function Dashboard() {
  return (
    <>
      <ClientHooks />
      <AuthRedirectWrapper>
        <div className='flex flex-col gap-6 max-w-3xl w-full'>
          <SmartContractUI />
          {WIDGETS.map((element) => (
            <Widget key={element.title} {...element} />
          ))}
        </div>
      </AuthRedirectWrapper>
    </>
  );
}
