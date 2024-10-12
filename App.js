import RoutesProject from "./routes/routes.js";
import { Provider } from 'react-redux';
import { store } from './store/store.js';


export default function App() {
  return (
    <Provider store={store}>
      <RoutesProject />
    </Provider>
  );
}