// LandTitleRegistry.js
'use client';
import { ethers } from "ethers";
import WalletLink from "@coinbase/wallet-sdk";
import React, { createContext, useState, useEffect } from "react";

// INTERNAL IMPORTS
import { LandTitleRegistry_ABI, LandTitleRegistry_ADDRESS } from './constants';

// Set up Coinbase Wallet SDK
const APP_NAME = "Land Title Registry";
const APP_LOGO_URL = "https://example.com/logo.png";  // Replace with your app logo
const DEFAULT_ETH_JSONRPC_URL = "https://api.developer.coinbase.com/rpc/v1/base-sepolia/xeKjyo9jlzsi9SkZKcxHYlYmSg2a8sdr"; // Replace with your RPC URL
const DEFAULT_CHAIN_ID = 1;

const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

const ethereum = walletLink.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID);
const provider = new ethers.providers.Web3Provider(ethereum);

export const LandTitleRegistryContext = createContext();

export const LandTitleRegistryProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [useSmartWallet, setUseSmartWallet] = useState(false);
  const [error, setError] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  // Smart contract interactions
  const contractAddress = LandTitleRegistry_ADDRESS; // Replace with your contract address
  const contractABI = LandTitleRegistry_ABI; // Replace with your contract ABI

  const getLandDetails = async (id) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return await contract.getLandDetails(id);
  };

  const registerLandTitle = async (id, ownerAddress, location, area, documentHash) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    await contract.registerLandTitle(id, ownerAddress, location, area, documentHash);
  };

  const updateLandDetails = async (id, newOwnerAddress, newLocation, newArea, newDocumentHash) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    await contract.updateLandDetails(id, newOwnerAddress, newLocation, newArea, newDocumentHash);
  };

  return (
    <LandTitleRegistryContext.Provider
      value={{
        currentAccount,
        connectWallet,
        disconnectWallet,
        useSmartWallet,
        setUseSmartWallet,
        getLandDetails,
        registerLandTitle,
        updateLandDetails,
        error
      }}
    >
      {children}
    </LandTitleRegistryContext.Provider>
  );
};
