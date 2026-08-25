'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { contractAddress } from '@/config';
import { AccountType, useGetNetworkConfig } from '@/lib';
import { ACCOUNTS_ENDPOINT } from '@/localConstants';

export const useGetSmartContractDetails = () => {
  const { network } = useGetNetworkConfig();

  const [smartContractDetails, setSmartContractDetails] =
    useState<AccountType>();
  const [isLoading, setIsLoading] = useState(true);

  const getSmartContractDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<AccountType>(
        `${network.apiAddress}/${ACCOUNTS_ENDPOINT}/${contractAddress}`
      );

      if (data) {
        setSmartContractDetails(data);
      }
    } catch (error) {
      console.error('Unable to fetch smartContractDetails', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSmartContractDetails();
  }, []);

  return { smartContractDetails, getSmartContractDetails, isLoading };
};
