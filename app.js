import { LandTitleRegistryProvider } from "/context/LandTitleRegistry";

function MyApp({ Component, pageProps }) {
  return (
    <LandTitleRegistryProvider>
      <Component {...pageProps} />
    </LandTitleRegistryProvider>
  );
}

export default MyApp;
