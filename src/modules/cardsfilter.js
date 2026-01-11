import { useObserver } from "./observer.js";

const filters = [{
    years: []
}]

function checkFilters(y) {
    if (!filters.years.includes(y)) {
        filters.years.push(y);
    }
}

function filterCards(year) {
    if (year != 'all'){
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('card-visible');
        });
        document.querySelectorAll(`[id*="gamecard-${year}"]`).forEach(card => {
            card.classList.remove('hidden');
        });
    } else {
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
            card.classList.remove('hidden');
        });
    }
    useObserver();
}

export const handleFilterChange = () => {
    const y = document.getElementById('year-filter').value;
    filterCards(y);
};