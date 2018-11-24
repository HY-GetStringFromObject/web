import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mapReducer } from './map'

const config = {
  key: 'HackYeah',
  storage,
  blacklist: []
}

export default persistCombineReducers(config, {
  routing: routerReducer,
  form: formReducer,
  map: mapReducer
})
