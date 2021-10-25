import Routes from './routes';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import "antd/dist/antd.css";

function App() {
  const store = configureStore();
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
