import  React from 'react';
import  ReactDOM from 'react-dom';
import  {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import  {AppContainer} from 'react-hot-loader';
import  {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './App';
import rootReducer from './rootReducer';

const middleware = () => {
    return [ thunk ]
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware())
);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
            <App/>
        </AppContainer>
    </Provider>, document.getElementById('root'));