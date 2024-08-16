import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import './App.css';
import UsersTable from './pages/UsersTable';
import AddUser from './pages/AddUser';
import PageTransition from './pages/PageTransition'; // Adjust path as needed

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper>
                    <Layout>
                    <Dashboard />
                    </Layout>
                    </PageWrapper>} />
                <Route path="/manage-users" element={
                    <PageWrapper>
                        <Layout>
                    <UsersTable />
                    </Layout>
                    </PageWrapper>} />
                <Route path="/add-user" element={
                    <PageWrapper>
                        <Layout>
                        <AddUser />
                        </Layout>
                        </PageWrapper>} />
            </Routes>
        </Router>
    );
};

// Wrapper component to manage transitions
const PageWrapper = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <PageTransition key={location.pathname}>
                {children}
            </PageTransition>
        </AnimatePresence>
    );
};

export default App;
