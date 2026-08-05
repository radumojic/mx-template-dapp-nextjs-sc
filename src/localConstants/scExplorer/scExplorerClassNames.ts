import { CustomClassNamesType } from '@/lib/sdkDappScExplorer';

/**
 * Tailwind overrides handed to the sdk-dapp-sc-explorer providers, so the
 * generated endpoint UI picks up the template look instead of the library one.
 * Shared by SmartContractDefaultUI and SmartContractUI.
 */
// prettier-ignore
export const scExplorerClassNames: CustomClassNamesType = {
  wrapperClassName: 'flex flex-col gap-4 w-full text-primary',
  cardClassName: 'flex flex-col flex-1 rounded-xl bg-primary p-6 justify-center border border-secondary text-primary', // endpoint
  cardHeaderClassName: 'mb-5', // row 1
  cardBodyClassName: 'flex items-center w-full', // row 2
  listClassName: '',
  listItemClassName: 'mb-4',
  badgeClassName: '', // write / payable / view / interactive
  badgePrimaryClassName: 'text-secondary text-sm', // interactive, only owner
  badgeSecondaryClassName: 'border rounded-lg border-secondary text-secondary text-sm', // write / payable / view
  badgeActiveClassName: '',
  badgeInactiveClassName: '',
  badgeFilledClassName: '',
  badgeIconClassName: '', // icons
  cardItemClassName: '',
  cardItemIconClassName: '',
  cardItemTitleClassName: '',
  cardItemValueClassName: '',
  cardItemContainerClassName: '',
  buttonClassName: 'hidden', // expand all / reset
  buttonPrimaryClassName: 'rounded-lg px-3 py-2 mt-3 text-center bg-btn-primary text-btn-primary hover:bg-btn-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out', // send transaction / query
  buttonSecondaryClassName: '',
  inputClassName: 'text-sm border border-secondary bg-secondary rounded-xl overflow-auto p-3.5 w-full', // input fields
  inputInvalidClassName: '',
  inputInvalidFeedbackClassName: '',
  inputGroupClassName: '', // next to input & address
  inputGroupAppendClassName: '', // address info
  inputGroupPrependClassName: '',
  selectClassName: '',
  tabClassName: '',
  activeTabClassName: ''
};
