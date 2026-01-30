import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="app-navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo-text">
                    Dunyo davlatlari
                </Link>

                <button onClick={toggleTheme} className="theme-btn">
                    {isDarkMode ? (
                        <>
                            <Sun size={18} className="text-yellow-400" />
                            <span>Yorug' rejim</span>
                        </>
                    ) : (
                        <>
                            <Moon size={18} />
                            <span>Tungi rejim</span>
                        </>
                    )}
                </button>
            </div>
        </nav>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="app-root">
            <Navbar />
            <main className="container">
                {children}
            </main>
        </div>
    );
};

export default Layout;
