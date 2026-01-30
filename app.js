const countriesGrid = document.getElementById('countries-grid');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const themeToggle = document.getElementById('theme-toggle');

let allCountries = [];

// Fetch all countries
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');

        allCountries = await response.ok ? await response.json() : [];
        renderCountries(allCountries);
    } catch (error) {
        countriesGrid.innerHTML = `<div class="loader">Error: ${error.message}</div>`;
    }
}

// Render country cards
function renderCountries(countries) {
    if (countries.length === 0) {
        countriesGrid.innerHTML = '<div class="loader">No countries found.</div>';
        return;
    }

    countriesGrid.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';

        // Handle common data issues
        const population = country.population ? country.population.toLocaleString() : 'N/A';
        const region = country.region || 'N/A';
        const capital = country.capital ? country.capital[0] : 'N/A';

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="country-info">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>Capital:</strong> ${capital}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            // Logic for detail view could go here
            console.log(`Clicked on ${country.name.common}`);
        });

        countriesGrid.appendChild(card);
    });
}

// Filter and Search logic
function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const region = regionFilter.value;

    const filtered = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchTerm);
        const matchesRegion = region === '' || country.region === region;
        return matchesName && matchesRegion;
    });

    renderCountries(filtered);
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');

    if (isDark) {
        icon.className = 'fa-solid fa-sun';
        text.innerText = 'Light Mode';
    } else {
        icon.className = 'fa-regular fa-moon';
        text.innerText = 'Dark Mode';
    }
});

// Event Listeners
searchInput.addEventListener('input', filterCountries);
regionFilter.addEventListener('change', filterCountries);

// Initial Load
fetchCountries();
