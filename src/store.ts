/**
 * Sets up the state/store for the app. This combines the reducers, composes
 * with epics (for redux-observable / side effects) and middleware, and
 * creates and exports the store
 *
 * NOTE: This file requires many updates. Please review the entire file and
 * comments while initializing a project since you will have to make appropriate
 * changes that correspond to your project
 */

import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import {
  combineEpics,
  createEpicMiddleware,
  Epic,
  ActionsObservable,
  StateObservable,
} from 'redux-observable';

// For development

/* tslint:disable:no-any */
declare const window: any;
declare const module: any;
declare const process: any;
/* tslint:enable */

// Application state shape. This will match the object passed to combineReducers
export interface AppState {}

// This should be the union type of all Actions in the application. This will
// be the Input Action type for the app Epic since all actions flow through
// epics. See: https://github.com/redux-observable/redux-observable/pull/473#issuecomment-380743284
export type AppActions = { type: 'HOT_RELOAD' };

// Stateless application epic. Extend this interface with appropriate output
// actions for the particular epic.
export interface AppEpic<O extends AppActions> extends Epic<AppActions, O> {}

// Less common Epic type that requires state access
export interface AppStatefulEpic<O extends AppActions>
  extends Epic<AppActions, O, AppState> {}

const epicMiddleware = createEpicMiddleware();
let middleware = [epicMiddleware];
let composeEnhancers = compose;

// Set up debugging, especially for redux
if (__DEV__) {
  middleware = [...middleware];

  // See: https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? /* tslint:disable:ter-indent */
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: true,
        // set this environment variable to replay actions on hot reload
        shouldHotReload: !!process.env.REDUX_DEVTOOLS_HOT_RELOAD,
      })
    : compose;
  /* tslint enable */
}

// Build root reducer object. This is used to replace the reducer for hot reload
function getRootReducer() {
  // Ex: const { exampleReducer: example } = require('src/example.reducer');

  // combineReducers requires at least one property. Replace.
  return combineReducers({
    example: () => ({}),
  });
}

/**
 * See: https://github.com/redux-observable/redux-observable/blob/master/MIGRATION.md
 * Build root epic object. This is used to rerun the epics for hot reload.
function getRootEpic<T extends Action>(action: ActionsObservable<T>, state: StateObservable<AppState>) {
  const { exampleEpic } = require('src/example/epic');

  return combineEpics(exampleEpic)(action, state, {}).pipe(
    takeUntil(action.pipe(ofType('HOT_RELOAD'))),
  );
}
*/

// Replace this with the example above once you have epics to use
function getRootEpic<T extends Action>(
  action: ActionsObservable<T>,
  state: StateObservable<void>,
) {
  return combineEpics()(action, state, {});
}

const store = createStore(
  getRootReducer(),
  composeEnhancers(applyMiddleware(...middleware)),
);
epicMiddleware.run(getRootEpic);

export const configureStore = () => {
  // Allow for hot reloading with redux. See:
  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  if (__DEV__ && module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(getRootReducer());
      store.dispatch({ type: 'HOT_RELOAD' });
      epicMiddleware.run(getRootEpic);
    });
  }

  return store;
};
