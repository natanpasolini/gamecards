import { handlePreviewChange } from "./cardPreview.js";

export function findSteamID() {
    let game = document.getElementById('inputGameTitle').value;
    if (game == '' || game == null) alert('Nome de jogo inválido ou vazio.'); else {
        let steamUrl = `https://store.steampowered.com/api/storesearch?term=${encodeURIComponent(game)}&l=brazilian&cc=BR`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(steamUrl)}`;

        const steamImagesHtml = `<dialog class="modal outline-none" id="modalSteamImages">
            <div class="modal-box flex flex-col bg-neutral-800 border border-neutral-700 relative gap-2 h-[400px]">
                <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalSteamImages').remove()"></i>
                <h1 class="font-silkscreen text-lg">${game}</h1>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
                <div class="grid grid-cols-2 gap-4 p-2 overflow-y-scroll flex-1 outline-none" id="steamImages">
                    <h1 class="font-silkscreen text-md" id="steamImagesLoading">Carregando...</h1>
                </div>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
        </dialog>`
        document.body.insertAdjacentHTML('afterbegin', steamImagesHtml);

        document.getElementById('modalSteamImages').showModal();
        const steamImages = document.getElementById('steamImages');

        fetch(proxyUrl)
            .then(res => {
                if (res.ok) return res.json();
                
                console.log('erro');
                throw new Error('Erro na requisição');
            })
            .then(data => {
                const steamData = JSON.parse(data.contents);
                document.getElementById('steamImagesLoading').remove();
                if (steamData.total > 0) {
                    steamData.items.forEach(element => {
                        steamImages.innerHTML += `
                        <div class="flex flex-col justify-center items-center p-2 gap-2 rounded transiton duration-300 hover:bg-neutral-700" data-appid="${element.id}" onclick="chooseImage(event)">
                            <img src='https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${element.id}/header.jpg' class="select-none">
                            <h1 class="font-silkscreen text-sm line-clamp-2">${element.name}</h1>
                        </div>`
                    });
                } else {
                    steamImages.classList.remove('grid-cols-2');
                    steamImages.innerHTML += `<h1 class="font-silkscreen text-sm w-full">NENHUM RESULTADO ENCONTRADO PARA ${game}</h1>`
                }
            })
            .catch(err => console.error("Erro:", err));
    }
}

export function chooseImage(event) {
    let elementoAtivo = event.currentTarget;
    const appid = elementoAtivo.dataset.appid;
    document.getElementById('inputGameImg').value = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`;
    if (document.getElementById('modalCardCreator')) handlePreviewChange();
    document.getElementById('modalSteamImages').remove();
}