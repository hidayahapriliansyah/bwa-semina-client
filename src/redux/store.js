import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import categoriesReducer from './categories/reducer';
import notifReducer from './notif/reducer';
import talentsReducer from './talents/reducer';
import paymentsReducer from './payments/reducer';
import listsReducer from './lists/reducer';
import eventsReducer from './events/reducer';
import ordersReducer from './orders/reducer';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notif: notifReducer,
  talents: talentsReducer,
  payments: paymentsReducer,
  lists: listsReducer,
  events: eventsReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
