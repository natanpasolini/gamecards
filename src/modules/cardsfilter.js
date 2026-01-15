import { useObserver } from "./observer.js";
import { data } from "./handlerData.js";

let filters = {
    years: [],
    scores: ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D']
};

export function refreshFilters() {
    const years = filters.years;
    let yearFilter = document.getElementById('year-filter');
    const scores = filters.scores;
    let scoreFilter = document.getElementById('score-filter');

    for (let i = 0; i < data.length; i++) {
        if (!years.includes(data[i].year)) years.push(data[i].year);
    };
    years.sort(function(a, b){return b - a});

    yearFilter.innerHTML = `<option value="all" disabled selected>Ano</option><option value="all">Todos</option>`
    for (let i = 0; i < years.length; i++) {
        let novooption = `<option value="${years[i]}">${years[i]}</option>`;
        yearFilter.innerHTML += novooption;
    }

    scoreFilter.innerHTML = `<option value="all" disabled selected>NOTA</option><option value="all">Todas</option>`
    for (let i = 0; i < scores.length; i++) {
        let novooption = `<option value="${scores[i]}">${scores[i]}</option>`;
        scoreFilter.innerHTML += novooption;
    }
};

function filterCards(yearF,scoreF) {
    const years = filters.years;
    const scores = filters.scores;

    document.querySelectorAll("#gamecard").forEach(card => {
        card.classList.remove('hidden');
    });

    if (yearF != 'all') {
        document.querySelectorAll("#gamecard").forEach(card => {
            let cardYear = card.dataset.year;
            if (cardYear != yearF) card.classList.add('hidden'); else card.classList.remove('hidden');
        });
    };
    if (scoreF != 'all') {
        document.querySelectorAll("#gamecard").forEach(card => {
            let cardScore = card.dataset.score;
            if (cardScore != scoreF) card.classList.add('hidden');
        });
    }
};

export const handleFilterChange = () => {
    const y = document.getElementById('year-filter').value;
    const s = document.getElementById('score-filter').value;
    filterCards(y,s);
};