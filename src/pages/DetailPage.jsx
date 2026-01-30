import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`);
                if (!response.ok) throw new Error('Davlat topilmadi');
                const data = await response.json();
                setCountry(data[0] || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [id]);

    if (loading) return (
        <div className="text-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto"></div>
        </div>
    );

    if (error || !country) return (
        <div className="text-center mt-20">
            <h2 className="detail-header">Xatolik!</h2>
            <p className="info-value">{error || 'Ma\'lumotlarni yuklab bo\'lmadi.'}</p>
            <button onClick={() => navigate('/')} className="back-btn mt-8">
                <ArrowLeft size={20} /> Orqaga qaytish
            </button>
        </div>
    );

    const nativeName = country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : country.name.common;

    const currencies = country.currencies
        ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
        : 'Nomalum';

    const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'Nomalum';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="animate-fadeIn"
        >
            <button onClick={() => navigate(-1)} className="back-btn">
                <ArrowLeft size={18} />
                <span>Orqaga</span>
            </button>

            <div className="detail-container">
                <div className="detail-flag-box">
                    <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="detail-flag"
                    />
                </div>

                <div className="detail-info">
                    <h1 className="detail-header">{country.name.common}</h1>

                    <div className="detail-grid">
                        <div className="detail-col">
                            <DetailItem label="Mahalliy nomi" value={nativeName} />
                            <DetailItem label="Aholi soni" value={country.population?.toLocaleString()} />
                            <DetailItem label="Mintaqa" value={country.region} />
                            <DetailItem label="Kichik mintaqa" value={country.subregion} />
                            <DetailItem label="Poytaxt" value={country.capital?.[0]} />
                        </div>
                        <div className="detail-col">
                            <DetailItem label="Yuqori darajadagi domen" value={country.tld?.[0]} />
                            <DetailItem label="Valyutalar" value={currencies} />
                            <DetailItem label="Tillar" value={languages} />
                        </div>
                    </div>

                    {country.borders && country.borders.length > 0 && (
                        <div className="border-countries">
                            <span className="border-label">Chegaradosh davlatlar:</span>
                            <div className="border-list">
                                {country.borders.map(border => (
                                    <button
                                        key={border}
                                        onClick={() => navigate(`/country/${border}`)}
                                        className="theme-btn"
                                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                                    >
                                        {border}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-20">
                        <a
                            href={`https://uz.wikipedia.org/wiki/${country.name.common}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="back-btn"
                            style={{ margin: 0, gap: '0.75rem', backgroundColor: 'var(--accent-color)', color: 'white', borderColor: 'transparent' }}
                        >
                            <ExternalLink size={18} />
                            <span>Vikipediya orqali o'qish</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="info-item" style={{ marginBottom: '0.75rem' }}>
        <span className="info-label">{label}:</span>
        <span className="info-value">{value || 'Nomalum'}</span>
    </div>
);

export default DetailPage;
