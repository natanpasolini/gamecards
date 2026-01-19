import { data, buildCards } from "./handlerData.js";
import { removeCards } from "./handlerData.js";

let filters = {
    years: [],
    scores: []
};

export function refreshFilters() {
    const years = filters.years;
    let yearFilter = document.getElementById('year-filter');
    const scores = filters.scores;
    let scoreFilter = document.getElementById('score-filter');

    for (let i = 0; i < data.length; i++) {
        if (!years.includes(data[i].year)) years.push(data[i].year);
        if (!scores.includes(data[i].score)) scores.push(data[i].score);
    };
    years.sort(function(a, b){return b - a});
    scores.sort().reverse();

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

export let cardsFiltered = [];

function filterCards(yearF,scoreF) {
    const cardsFiltering = [];
    cardsFiltered = [];

    removeCards();

    if (yearF != 'all') {
        data.forEach(game => {
            if (game.year == yearF) cardsFiltering.push(game.uid);
        })
    } else {
        data.forEach(game => cardsFiltering.push(game.uid));
    }
    
    if (scoreF != 'all') {
        cardsFiltering.forEach(card => {
            data.forEach(game => {
                if (game.uid == card && game.score == scoreF) cardsFiltered.push(card);
            })
        })
    } else cardsFiltered = cardsFiltering;

    buildCards();
};

export const handleFilterChange = () => {
    const y = document.getElementById('year-filter').value;
    const s = document.getElementById('score-filter').value;
    filterCards(y,s);
};