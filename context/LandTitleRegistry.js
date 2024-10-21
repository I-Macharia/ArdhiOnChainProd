'use client';
import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

// INTERNAL IMPORTS
import { LandTitleRegistry_ABI, LandTitleRegistry_ADDRESS } from './constants';

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(LandTitleRegistry_ADDRESS, LandTitleRegistry_ABI, signerOrProvider);

export const LandTitleRegistryContext = createContext();

export const LandTitleRegistryProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  const [useSmartWallet, setUseSmartWallet] = useState(true); // Flag to toggle wallet type

  useEffect(() => {
    try {
      const sdk = new CoinbaseWalletSDK({ appName: 'An Awesome App', appChainIds: [84532] });
      const newProvider = sdk.makeWeb3Provider();
      setProvider(newProvider);
    } catch (error) {
      console.error('Error initializing Coinbase Wallet SDK:', error);
      setError('Failed to initialize wallet provider.');
    }
  }, []);
  
  // Function to connect the wallet
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    let accounts;
    try {
      if (useSmartWallet) {
              accounts = await provider.request({ method: 'eth_requestAccounts' });
            }
      else if (window.ethereum) {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              }
      else {
                setError('MetaMask not detected. Please install it to connect.');
                return;
              }

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setError(null); // Clear any previous errors
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setError('Error connecting to wallet. Please try again.');
    }
    setLoading(false);
  };

  // Function to disconnect the wallet
  const disconnectWallet = async () => {
    setCurrentAccount(null);
    // Optionally handle any necessary cleanup here
  };

  // Function to get land details
  const getLandDetails = async (id) => {
    setLoading(true);
    if (!provider) {
      return;
    } // Ensure provider is initialized

    const contract = fetchContract(provider);

    try {
      const landDetails = await contract.getLandDetails(id);
      return {
              isRegistered: landDetails.isRegistered,
              ownerAddress: landDetails.ownerAddress,
              location: landDetails.location,
              area: landDetails.area.toString(),
              documentHash: landDetails.documentHash,
            };
    } catch (error) {
      console.error('Error fetching land details:', error);
      setError('Failed to fetch land details. Please check the console for details.');
    }
    setLoading(false)
  };

  // Function to check if the wallet is connected
  const ifWalletConnected = async () => {
    if (!provider) {
      return;
    } // Ensure provider is initialized

    try {
      const accounts = await provider.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  useEffect(() => {
    ifWalletConnected();
  }, [provider]); // Depend on provider to ensure it's ready

  return (
    <LandTitleRegistryContext.Provider
      value={{
        currentAccount,
        connectWallet,
        disconnectWallet,
        getLandDetails,
        error,
        setUseSmartWallet, // Expose this function to toggle wallet type
        useSmartWallet, // Provide the current wallet type flag
      }}
    >
      {children}
    </LandTitleRegistryContext.Provider>
  );
};
