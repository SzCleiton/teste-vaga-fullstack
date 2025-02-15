import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</React.StrictMode>,
	);
} else {
	console.error('Element with id "root" not found in the document.');
}
