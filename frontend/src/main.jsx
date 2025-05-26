import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
);