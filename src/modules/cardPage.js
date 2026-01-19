import { cardsFiltered } from "./cardsfilter.js";
import { buildCard } from "./gamecards.js";
import { data, removeCards } from "./handlerData.js";
import { maxCardsPerPage } from "../../main.js";

export let pageSelected = 1;
export let totalPages = 1;

export function generatePages() {
    let pages = Math.ceil(data.length/maxCardsPerPage)
    if (cardsFiltered.length > 0) pages = Math.ceil(cardsFiltered.length/maxCardsPerPage);
    const gamelistPages = document.getElementById('gamelistPages');
    gamelistPages.innerHTML = ``;
    totalPages = pages;
    for (let i = 0; i < pages; i++) {
        gamelistPages.innerHTML += `<span class="rounded-full w-[12px] h-[12px] bg-neutral-700 transition duration-300 cursor-pointer hover:bg-neutral-600" data-pageid="${i+1}" onclick="changePage(event)"></span>`
    }
    gamelistPages.querySelector('span[data-pageid="1"]').classList.add('bg-white');
    pageSelected = 1;
}

export function changePage(event) {
    const elementoAtivo = event.currentTarget;
    const gamelistPages = document.getElementById('gamelistPages');
    gamelistPages.querySelector(`span[data-pageid='${pageSelected}']`).classList.remove('bg-white');

    elementoAtivo.classList.add('bg-white');
    pageSelected = elementoAtivo.dataset.pageid;

    removeCards();

    let inicial = 0;
    let final = maxCardsPerPage;
    let newdata = data.toReversed();
    if (pageSelected != 1) inicial = (pageSelected - 1) * maxCardsPerPage, final = inicial + maxCardsPerPage;

    if (cardsFiltered.length == 0) {
        if (final > data.length) final = data.length;

        console.log(pageSelected, inicial, final)
        for (let i = final - 1; i >= inicial; i--) {
            const game = newdata[i];
            buildCard(
                game.uid,
                game.title, 
                game.year, 
                game.achievements, 
                game.maxachievements, 
                game.hours, 
                game.score, 
                game.imglink,
                game.imgstyle,
                game.background,
                game.desc
            );
        }
    } else {
        let newFiltered = cardsFiltered.toReversed();
        let final = pageSelected * maxCardsPerPage;
        if (final > cardsFiltered.length) final = cardsFiltered.length;

        for (let i = final - 1; i >= inicial; i--) {
            let card = newFiltered[i];
            newdata.forEach(game => {
                if (game.uid == card) {
                    buildCard(
                        game.uid,
                        game.title, 
                        game.year, 
                        game.achievements, 
                        game.maxachievements, 
                        game.hours, 
                        game.score, 
                        game.imglink,
                        game.imgstyle,
                        game.background,
                        game.desc
                    );
                }
            })
        };
    }
}