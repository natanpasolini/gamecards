import { carregarDados, ativarObservador } from './modules/gamecards.js';

function filterCards(platform, year) {
    platform = platform.toLowerCase();
    if (platform == 'all' && year == 'all') {
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
        card.classList.remove('hide');
        card.classList.remove('card-visible');
    });
    } else if (platform == 'all' && year != 'all') {
        document.querySelectorAll(`[id*="${year}"]`).forEach(card => {
            card.classList.remove('hide');
            card.classList.remove('card-visible');
        });
    } else {
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
            card.classList.add('hide');
            card.classList.remove('card-visible');
        });
    if (year != 'all'){
        document.querySelectorAll(`[id*="${platform}-${year}"]`).forEach(card => {
            card.classList.remove('hide');
            card.classList.remove('card-visible');
        });
    } else {
        document.querySelectorAll(`[id*="${platform}"]`).forEach(card => {
            card.classList.remove('hide');
            card.classList.remove('card-visible');
        });
    }
    }
    ativarObservador();
}

const handleFilterChange = () => {
    const p = document.getElementById('platform-filter').value;
    const y = document.getElementById('year-filter').value;
    filterCards(p, y);
};

document.getElementById('platform-filter').addEventListener('change', handleFilterChange);
document.getElementById('year-filter').addEventListener('change', handleFilterChange);