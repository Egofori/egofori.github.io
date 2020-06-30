import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../src/style/style.css'
import "semantic-ui-css/semantic.min.css"
import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { sessionReducer, sessionService } from 'redux-react-session'
import rootReducer from './reducers/rootReducer'
import { CookiesProvider } from 'react-cookie';

const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}><CookiesProvider><App /></CookiesProvider></Provider>,document.getElementById('root'))

