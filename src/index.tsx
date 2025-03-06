import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./containers/App";
import { LocalizeProvider } from "react-localize-redux";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/scss/main.scss";
import { BrowserRouter, useNavigate, } from 'react-router-dom';
import CustomError from "./containers/custom-error";
import { setNavigate } from './navigate-service.';

const AppWithNavigate = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return <App />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CustomError>
    <Provider store={store}>
      <LocalizeProvider>
        <BrowserRouter>
          <AppWithNavigate />
        </BrowserRouter>
      </LocalizeProvider>
    </Provider>
  </CustomError>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

