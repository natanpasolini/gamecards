import { refreshFilters } from "./cardsfilter.js";
import { buildCard } from "./gamecards.js";
import { modalGuiaVisto } from "./modals.js";

export const data = [
];

export function writeToData(t, y, a, ma, h, s, i, iS, rgb, d) {
    const uniqueId = Date.now() + 1;
    const newEntry = {
        title: t,
        year: y,
        achievements: a,
        maxachievements: ma,
        hours: h,
        score: s,
        imglink: i,
        imgstyle: iS,
        background: rgb,
        desc: d,
        uid: uniqueId
    };

    data.push(newEntry);
    
    sendCardData(data);
};

let cardsID = -1;
let cardsCreated = 0;

function sendCardData(data) {
    const id = cardsID + 1;
    const uid = data[id].uid;
    const title = data[id].title;
    const year = data[id].year;
    const achievements = data[id].achievements;
    const maxachievements = data[id].maxachievements;
    const hours = data[id].hours;
    const score = data[id].score;
    const imglink = data[id].imglink;
    const imgstyle = data[id].imgstyle;
    const background = data[id].background;
    const desc = data[id].desc;
    let golden = false;
    if (Number(achievements) >= 0 && Number(achievements) > 0 && achievements == maxachievements) {
        golden = true;
    }

    cardsCreated += 1;
    cardsID += 1;
    if (cardsCreated > 0) {
        document.getElementById('newGameCard').classList.add('hidden');
    };
    saveToLocalStorage();
    buildCard(uid,title,year,achievements,maxachievements,hours,score,imglink,imgstyle,background,desc,golden);
};

export function downloadDB() {
    // Array pra JSON
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Criar download invisivel
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gamecards_db.json';
    
    // "Forçar" download
    a.click();
    window.URL.revokeObjectURL(url);
}

export function uploadDB(event) {
    const fileInput = document.getElementById('fileInputHandler');
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            // Validação do arquivo
            if (!Array.isArray(importedData)) {
                throw new Error("O arquivo deve conter uma lista de jogos.");
            }

            if (importedData.length > 0) {
                const requiredKeys = ['title','year','achievements','maxachievements','hours','score','imglink'];
                importedData.forEach(game => {
                    const hasAllKeys = requiredKeys.every(key => key in game);
                    if (!hasAllKeys) {
                        throw new Error("Estrutura do arquivo inválida (keys missing). Por favor verifique o arquivo.");
                    }
                })
            }

            // Deleta os cards antigos
            document.querySelectorAll('[id*="gamecard"]').forEach(card => {
                card.remove();
            });
            
            // Substituir array
            data.length = 0; // Limpa array
            data.push(...importedData); // Adiciona os novos dados

            // Criar chaves novas em saves antigos
            for (let i = 0; i < data.length; i++) {
                const uniqueId = Date.now() + i;
                if (data[i].background == '' || data[i].background == null) data[i].background = [93, 42, 155];
                if (data[i].imgstyle == '' || data[i].imgstyle == null) data[i].imgstyle = ['object-fill','object-center'];
                if (data[i].uid == '' || data[i].uid == null) data[i].uid = uniqueId;
                if (data[i].desc == null) data[i].desc = 'Adicione uma descrição a este gamecard no modo editar!';
            }

            // Cria todos os cards novos
            refreshData();

            console.log("Upload concluído com sucesso!");
            document.getElementById('newGameCard').classList.add('hidden');
            saveToLocalStorage();
            
            // Resetar input
            fileInput.value = ''; 

        } catch (err) {
            document.getElementById('modalErroUpload').showModal();
            console.error(err);
        }
    };

    reader.readAsText(file);
}

export function refreshData() {
    refreshFilters();

    // Limpar variaveis
    cardsCreated = 0;
    cardsID = -1;

    document.querySelectorAll('[id*="gamecard"]').forEach(card => {
        card.remove();
    });

    // Arruma as variaveis novas
    for (let i = 0; i < data.length; i++) {
        cardsCreated += 1;
        cardsID += 1;
    }    

    if (cardsCreated > 0) {
        document.getElementById('newGameCard').classList.add('hidden');
        data.forEach(game => {
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
        });
    } else {
        document.getElementById('newGameCard').classList.remove('hidden');
    };
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('gamelist_db', JSON.stringify(data));
    localStorage.setItem('modalGuiaVisto', modalGuiaVisto);
}

export function loadFromLocalStorage() {
    const savedData = localStorage.getItem('gamelist_db');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        data.length = 0;
        data.push(...parsedData);

        // Criar chaves novas em saves antigos.
        for (let i = 0; i < data.length; i++) {
            const uniqueId = Date.now() + i;
            if (data[i].background == '' || data[i].background == null) data[i].background = [93, 42, 155];
            if (data[i].imgstyle == '' || data[i].imgstyle == null) data[i].imgstyle = ['object-fill','object-center'];
            if (data[i].uid == '' || data[i].uid == null) data[i].uid = uniqueId;
            if (data[i].desc == null) data[i].desc = 'Adicione uma descrição a este gamecard no modo editar!';
        }
        
        refreshData();
        return true;
    }
    return false;
}