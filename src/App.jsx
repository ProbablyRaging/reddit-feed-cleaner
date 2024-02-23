import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Keywords, Links } from './views';
import { NavBar } from './components';

const MainPage = lazy(() => import('./components/MainPage'));
const background = lazy(() => import('./constants/background'));

const App = () => {
    return (
        <BrowserRouter>
            <MainPage>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Keywords />} />
                    <Route path="/keywords" element={<Keywords />} />
                    <Route path="/links" element={<Links />} />
                    <Route path="*" element={<Navigate to='/' />} />
                </Routes>
            </MainPage>

        </BrowserRouter>
    )
};

export default App;