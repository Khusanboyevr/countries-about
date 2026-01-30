import { useState, useEffect, useMemo } from 'react';

const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3');
                if (!response.ok) throw new Error('Failed to fetch countries');
                const data = await response.json();
                setCountries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const filteredCountries = useMemo(() => {
        return countries.filter(country => {
            const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });
    }, [countries, searchTerm, selectedRegion]);

    return {
        countries: filteredCountries,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedRegion,
        setSelectedRegion,
        regions: [...new Set(countries.map(c => c.region))].sort()
    };
};

export default useCountries;
