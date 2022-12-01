import React from "react";
import * as ReactDOM from "react-dom";
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime.js";
import { store } from "./store";
import { Provider } from "react-redux";
import { MoralisProvider } from "react-moralis";
import AudioWrapper from "./common/wrapper/AudioWrapper/AudioWrapper";
import GlobalWrapper from "./common/wrapper/GlobalWrapper/GlobalWrapper";
import OGsWrapper from "./common/wrapper/OGsWrapper/OGsWrapper";
import snapshot from "@snapshot-labs/snapshot.js";
import App from "./App";
// snapshot client
const hub = "https://hub.snapshot.org";
export const snapshotClient = new snapshot.Client712(hub);

// firebase imports and config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBL3xNUXJjHipMLaAP7EOD4KfVDeQe6Jq8",
	authDomain: "heds-34ac0.firebaseapp.com",
	projectId: "heds-34ac0",
	storageBucket: "heds-34ac0.appspot.com",
	messagingSenderId: "951859114471",
	appId: "1:951859114471:web:a8e6cfe3751dd063040d42",
	measurementId: "G-X21PE2JM6B",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app, "gs://heds-34ac0.appspot.com");
const { provider, webSocketProvider } = configureChains(defaultChains, [
	publicProvider(),
  ]);
const client = createClient({
provider,
webSocketProvider,
});

ReactDOM.render(
	<MoralisProvider serverUrl="https://qmwf2weydi0m.usemoralis.com:2053/server" appId="KiB7e8lPCvDMU9VkOf2uM7d8Dt7DowQGR272Wkxd">
		<Provider store={store}>
			<BrowserRouter>
				<AudioWrapper>
					<GlobalWrapper>
						<WagmiConfig client={client}>
							<OGsWrapper>
								<App />
							</OGsWrapper>
						</WagmiConfig>
					</GlobalWrapper>
				</AudioWrapper>
			</BrowserRouter>
		</Provider>
	</MoralisProvider>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept();
}
