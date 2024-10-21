// pages.js
'use client';

import { LandTitleRegistryContext } from '/context/LandTitleRegistry';
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    if (currentAccount) {
      fetchLandTitles();
    }
  }, [currentAccount]);

  const fetchLandTitles = async () => {
    try {
      const titles = [];
      const totalLandTitles = 10; // Replace with your logic for total count

      for (let id = 0; id < totalLandTitles; id++) {
        const details = await getLandDetails(id);
        if (details.isRegistered) {
          titles.push(details);
        }
      }

      setLandTitles(titles);
    } catch (error) {
      console.error("Error fetching land titles:", error);
      setFetchError("Failed to fetch land titles. Please check the console for details.");
    }
  };

  const handleWalletToggle = () => {
    setUseSmartWallet((prev) => !prev);
  };

  const handleRegisterLandTitle = async () => {
    try {
      await registerLandTitle(
        newLandTitle.id,
        newLandTitle.ownerAddress,
        newLandTitle.location,
        newLandTitle.area,
        newLandTitle.documentHash
      );
      fetchLandTitles();
    } catch (error) {
      console.error("Error registering land title:", error);
    }
  };

  const handleUpdateLandTitle = async () => {
    try {
      await updateLandDetails(
        updateLandTitle.id,
        updateLandTitle.newOwnerAddress,
        updateLandTitle.newLocation,
        updateLandTitle.newArea,
        updateLandTitle.newDocumentHash
      );
      fetchLandTitles();
    } catch (error) {
      console.error("Error updating land title:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <header className="row-start-1">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Land Title Registry</h1>
          {currentAccount && (
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
          )}
        </nav>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Connect your wallet to view registered land titles.</li>
          <li>See your registered land titles instantly.</li>
        </ol>

        {/* Wallet Type Selection */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={useSmartWallet}
              onChange={handleWalletToggle}
            />
            Use Smart Wallet
          </label>
        </div>

        {/* Connect Wallet Button */}
        {!currentAccount && (
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838 ] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={connectWallet}
          >
            Connect {useSmartWallet ? "Smart Wallet" : "MetaMask"}
          </button>
        )}

        {error && <p className="text-red-500">{error}</p>}
        {fetchError && <p className="text-red-500">{fetchError}</p>}

        {currentAccount && (
          <div className="land-titles flex flex-col gap-4">
            {landTitles.length > 0 ? (
              landTitles.map((title, index) => (
                <div
                  key={index}
                  className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
                >
                  <p><strong>Owner:</strong> {title.ownerAddress}</p>
                  <p><strong>Location:</strong> {title.location}</p>
                  <p><strong>Area:</strong> {title.area} sq. ft.</p>
                  <p><strong>Document Hash:</strong> {title.documentHash}</p>
                </div>
              ))
            ) : (
              <p>No land titles registered yet.</p>
            )}
          </div>
        )}

        {/* Register Land Title Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegisterLandTitle();
          }}
        >
          <h2>Register Land Title</h2>
          <label>
            ID:
            <input
              type="number"
              value={newLandTitle.id}
              onChange={(e) => setNewLandTitle({ ...newLandTitle, id: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            Owner Address:
            <input
              type="text"
              value={newLandTitle.ownerAddress}
              onChange={(e) => setNewLandTitle({ ...newLandTitle, ownerAddress: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={newLandTitle.location}
              onChange={(e) => setNewLandTitle({ ...newLandTitle, location: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            Area:
            <input
              type="number"
              value={newLandTitle.area}
              onChange={(e) => setNewLandTitle({ ...newLandTitle, area: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            Document Hash:
            <input
              type="text"
              value={newLandTitle.documentHash}
              onChange={(e) => setNewLandTitle({ ...newLandTitle, documentHash: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Register Land Title</button>
        </form>

        {/* Update Land Title Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateLandTitle();
          }}
        >
          <h2>Update Land Title</h2>
          <label>
            ID:
            <input
              type="number"
              value={updateLandTitle.id}
              onChange={(e) => setUpdateLandTitle({ ...updateLandTitle, id: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            New Owner Address:
            <input
              type="text"
              value={updateLandTitle.newOwnerAddress}
              onChange={(e) => setUpdateLandTitle({ ...updateLandTitle, newOwnerAddress: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            New Location:
            <input
              type="text"
              value={updateLandTitle.newLocation}
              onChange={(e) => setUpdateLandTitle({ ...updateLandTitle, newLocation: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            New Area:
            <input
              type="number"
              value={updateLandTitle.newArea}
              onChange={(e) => setUpdateLandTitle({ ...updateLandTitle, newArea: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <label>
            New Document Hash:
            <input
              type="text"
              value={updateLandTitle.newDocumentHash}
              onChange={(e) => setUpdateLandTitle({ ...updateLandTitle, newDocumentHash: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </label>
          <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded">Update Land Title</button>
        </form>

        <div className="mt-2">
          <a href="https://hash-file.online/" target="_blank" className="text-blue-500 underline">Click here to hash your document</a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Docs icon"
            width={16}
            height={16}
          />
          Docs
        </a>
      </footer>
    </div>
  );
}