import { buildCard } from "./gamecards.js";

export const data = [
];

export function writeToData(t, y, a, ma, h, s, i) {
    const newEntry = {
        title: t,
        year: y,
        achievements: a,
        maxachievements: ma,
        hours: h,
        score: s,
        imglink: i
    };

    data.push(newEntry);
    
    console.log(data);
    sendCardData(data);
};

let cardsID = -1;
let cardsCreated = 0;

function sendCardData(data) {
    const id = cardsID + 1;
    const title = data[id].title;
    const year = data[id].year;
    const achievements = data[id].achievements;
    const maxachievements = data[id].maxachievements;
    const hours = data[id].hours;
    const score = data[id].score;
    const imglink = data[id].imglink;
    let golden = false;
    if (Number(achievements) >= 0 && Number(achievements) > 0 && achievements == maxachievements) {
        golden = true;
    }

    cardsCreated += 1;
    cardsID += 1;
    if (cardsCreated == 1) {
        document.getElementById('newGameCard').classList.add('hidden');
    };
    buildCard(title,year,achievements,maxachievements,hours,score,imglink,golden);
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
            
            // Substituir array
            data.length = 0; // Limpa array
            data.push(...importedData); // Adiciona os novos dados

            // Limpar grid
            const grid = document.querySelector('#gamelist');
            grid.innerHTML = '';

            // Cria todos os cards novos
            data.forEach(game => {
                buildCard(
                    game.title, 
                    game.year, 
                    game.achievements, 
                    game.maxachievements, 
                    game.hours, 
                    game.score, 
                    game.imglink
                );
            });

            console.log("Upload concluído com sucesso!");
            // Resetar input
            fileInput.value = ''; 

        } catch (err) {
            document.getElementById('modalErroUpload').showModal();
            console.error(err);
        }
    };

    reader.readAsText(file);
}