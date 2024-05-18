import './App.css';
import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import Index from './routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store }  from './services/store/store'; // Import your Redux store

function App() {
  return (
    // Wrap your application with Provider and pass the Redux store as a prop
    <Provider store={store}>
      <div>
        <Index />
      </div>
    </Provider>
  );
}

export default App;
