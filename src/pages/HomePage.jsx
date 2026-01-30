import React, { useMemo } from 'react';
import useCountries from '../hooks/useCountries';
import CountryCard from '../components/CountryCard';
import SkeletonList from '../components/Skeleton';
import { Search, Globe2 } from 'lucide-react';
import RegionDropdown from '../components/RegionDropdown';

const HomePage = () => {
    const {
        countries,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedRegion,
        setSelectedRegion
    } = useCountries();

    const regions = ["Afrika", "Amerika", "Osiyo", "Yevropa", "Okeaniya"];

    // Map internal region names to Uzbek for display/filtering logic if necessary
    // but since API returns English, we'll keep the hook logic English and map display
    const regionMap = {
        "Africa": "Afrika",
        "Americas": "Amerika",
        "Asia": "Osiyo",
        "Europe": "Yevropa",
        "Oceania": "Okeaniya"
    };

    const inverseRegionMap = {
        "Afrika": "Africa",
        "Amerika": "Americas",
        "Osiyo": "Asia",
        "Yevropa": "Europe",
        "Okeaniya": "Oceania"
    };

    if (error) return (
        <div className="text-center mt-20">
            <Globe2 size={64} className="accent-text opacity-20 mx-auto mb-4" />
            <h2 className="detail-header">Bog'lanishda xatolik</h2>
            <p className="info-value">{error}</p>
        </div>
    );

    return (
        <div className="animate-fadeIn">
            {/* Search and Filters */}
            <section className="controls-section">
                <div className="search-wrapper">
                    <Search size={20} className="info-value" />
                    <input
                        type="text"
                        placeholder="Davlatni qidirish..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <RegionDropdown
                    selected={regionMap[selectedRegion] || selectedRegion}
                    onSelect={(val) => setSelectedRegion(inverseRegionMap[val] || val)}
                    options={regions}
                />
            </section>

            {/* Results */}
            {loading ? (
                <SkeletonList />
            ) : (
                <div className="country-grid">
                    {countries.map(country => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            )}

            {!loading && countries.length === 0 && (
                <div className="text-center mt-20">
                    <p className="info-value">Hech qanday davlat topilmadi.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
