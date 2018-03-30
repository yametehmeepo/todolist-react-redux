import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/index.js';
//import { addTodo, toggleTodo } from './actions/index.js';
import './common/reset.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);
//console.log(store.getState());
const render = () => ReactDOM.render(<App store={store}/>, document.getElementById('root'));

registerServiceWorker();

render();
store.subscribe(render);


