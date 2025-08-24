import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Cấu hình React Router Dom với BrowserRouter
import {BrowserRouter} from 'react-router-dom'

// Cấu hình Redux
import {Provider} from 'react-redux'
import {store} from '~/redux/store'

// Cấu hình Redux Persist
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật InjectStore: để dùng redux trong các file phạm vi ngoài component
import {injectStore} from './utils/authorizeAxios'
injectStore(store)

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename='/'>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)
