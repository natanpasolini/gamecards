import { presets } from "./handlerData.js"

const modalMyPresets = `<dialog class="modal outline-none" id="modalMyPresets">
        <div class="modal-box flex flex-col bg-neutral-800 border border-neutral-700 relative gap-2 h-[400px]">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalMyPresets').remove()"></i>
            <h1 class="font-silkscreen text-lg">Meus Presets</h1>
            <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-2 overflow-y-scroll flex-1 outline-none items-start" id="presetsGrid">
                
            </div>
            <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
        </div>
    </dialog>`

export function loadMyPresets() {
    document.body.insertAdjacentHTML('afterbegin', modalMyPresets);

    Object.keys(presets).forEach(preset => {
        document.getElementById('presetsGrid').innerHTML += `<div class="flex flex-col justify-center items-center" id="preset${preset}">
                    <span class="w-[36px] h-[36px] rounded box-shadow border border-neutral-500" style="background: ${presets[preset]};"></span>
                    <h1 class="font-silkscreen truncate line-clamp-1">${preset}</h1>
                    <div class="flex flex-row justify-center items-center gap-2">
                        <h1 class="font-silkscreen">${presets[preset]}</h1>
                        <button class="flex justify-center items-center outline-none cursor-pointer group" data-preset="${preset}" onclick="deletePreset(event)"><i class="hn hn-trash-solid group-hover:text-red-500"></i></button>
                    </div>
                </div>`
    })

    document.getElementById('modalMyPresets').showModal();
}

export function deletePreset(event) {
    const presetSelected = event.currentTarget.dataset.preset;
    const divPresetSelected = document.getElementById(`preset${presetSelected}`);
    if (confirm(`Deletar '${presetSelected}'?`)) divPresetSelected.remove(); delete presets[presetSelected]; localStorage.setItem('presets', JSON.stringify(presets)); 
}