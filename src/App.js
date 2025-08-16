import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

/**
 * Main App component
 * Includes Providers and the main Layout
 */
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Layout 
          pageTitle="داشبورد" 
          activeMenuItem="dashboard"
        >
          <Dashboard />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
