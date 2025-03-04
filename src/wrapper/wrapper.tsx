import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

interface WrapperProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}


const Wrapper: React.FC<WrapperProps> = ({ 
  children, 
  loadingComponent = <div>Loading...</div> 
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;