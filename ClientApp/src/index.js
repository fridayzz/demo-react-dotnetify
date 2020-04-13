import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { DotNetifyProvider } from "use-dotnetify"
import HelloWorld from "./HelloWorld"

ReactDOM.render(
  <React.StrictMode>
    <DotNetifyProvider>
      <div>
      <App />
      </div>
      <div>
        <HelloWorld></HelloWorld>
      </div>
    </DotNetifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
