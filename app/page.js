// pages.js
'use client'; 
import { LandTitleRegistryContext } from '/context/LandTitleRegistry';
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function LandTitleRegistry() {
  const {
    currentAccount,
    connectWallet,
    disconnectWallet,
    error,
    setUseSmartWallet,
    useSmartWallet,
    getLandDetails,
    registerLandTitle,
    updateLandDetails
  } = useContext(LandTitleRegistryContext);

  const [landTitles, setLandTitles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [newLandTitle, setNewLandTitle] = useState({
    id: '',
    ownerAddress: '',
    location: '',
    area: '',
    documentHash: ''
  });
  const [updateLandTitle, setUpdateLandTitle] = useState({
    id: '',
    newOwnerAddress: '',
    newLocation: '',
    newArea: '',
    newDocumentHash: ''
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      fetchLandTitles();
    }
  }, [currentAccount]);

  const fetchLandTitles = async () => {
    try {
      const titles = [];
      const totalLandTitles = 10;

      for (let id = 0; id < totalLandTitles; id++) {
        const details = await getLandDetails(id);
        if (details.isRegistered) {
          titles.push(details);
        }
      }

      setLandTitles(titles);
    } catch (error) {
      console.error("Error fetching land titles:", error);
      setFetchError("Failed to fetch land titles.");
    }
  };

  return (
    <div>
      <header>
        <h1>Land Title Registry</h1>
        {currentAccount ? (
          <div>
            <CopyToClipboard text={currentAccount} onCopy={() => setCopied(true)}>
              <button>{copied ? "Copied!" : "Copy Address"}</button>
            </CopyToClipboard>
            <button onClick={disconnectWallet}>Disconnect</button>
          </div>
        ) : (
          <button onClick={connectWallet}>
            Connect {useSmartWallet ? "Smart Wallet" : "Coinbase Wallet"}
          </button>
        )}
      </header>

      {fetchError && <p>{fetchError}</p>}
      {error && <p>{error}</p>}
      
      {currentAccount && landTitles.length > 0 && (
        <div>
          {landTitles.map((title, index) => (
            <div key={index}>
              <p><strong>Owner:</strong> {title.ownerAddress}</p>
              <p><strong>Location:</strong> {title.location}</p>
              <p><strong>Area:</strong> {title.area}</p>
              <p><strong>Document Hash:</strong> {title.documentHash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
