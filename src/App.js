import React from 'react';
import './assets/sass/main.scss';
import AllQuestionsView from './views/AllQuestionsView';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <AllQuestionsView />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
