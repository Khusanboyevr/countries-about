import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -8 }}
            className="country-card"
            onClick={() => navigate(`/country/${country.cca3}`)}
        >
            <div className="card-image-box">
                <img
                    src={country.flags.svg}
                    alt={`${country.name.common} bayrog'i`}
                    className="card-image"
                />
            </div>

            <div className="card-body">
                <h3 className="country-name">{country.name.common}</h3>

                <div className="card-info-list">
                    <InfoItem label="Aholi soni" value={country.population?.toLocaleString()} />
                    <InfoItem label="Mintaqa" value={country.region} />
                    <InfoItem label="Poytaxt" value={country.capital?.[0]} />
                </div>
            </div>
        </motion.div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="info-item">
        <span className="info-label">{label}:</span>
        <span className="info-value">{value || 'Nomalum'}</span>
    </div>
);

export default CountryCard;
