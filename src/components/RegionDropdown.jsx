import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegionDropdown = ({ selected, onSelect, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div
                className="dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selected || 'Mintaqa bo\'yicha saralash'}</span>
                <ChevronDown
                    size={18}
                    className={`chevron-icon ${isOpen ? 'open' : ''}`}
                />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu"
                    >
                        <li
                            className={`dropdown-item ${!selected ? 'active' : ''}`}
                            onClick={() => { onSelect(''); setIsOpen(false); }}
                        >
                            Barcha mintaqalar
                        </li>
                        {options.map(option => (
                            <li
                                key={option}
                                className={`dropdown-item ${selected === option ? 'active' : ''}`}
                                onClick={() => { onSelect(option); setIsOpen(false); }}
                            >
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RegionDropdown;
