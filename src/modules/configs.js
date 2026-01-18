const configsSections = ['DADOS', 'OUTROS'];

const configs = [
    {
        section: 'DADOS',
        title: 'Download',
        description: 'Clique para fazer download da sua lista de jogos.',
        icon: 'hn-download-alt-solid',
        action: 'downloadDB()',
        extraLine: ''
    },
    {
        section: 'DADOS',
        title: 'Upload',
        description: 'Clique para fazer upload da sua lista de jogos.',
        icon: 'hn-upload-alt-solid',
        action: `document.getElementById('fileInputHandler').click()`,
        extraLine: `<input type="file" id="fileInputHandler" class="hidden" accept=".json">`
    },
    {
        section: 'OUTROS',
        title: 'Patch Notes',
        description: 'Clique para ver as últimas atualizações',
        icon: 'hn-refresh-solid',
        action: 'modalPatchNotes.showModal()',
        extraLine: ''
    }
];

const configsBlock = `<dialog class="modal outline-none" id="modalConfigs">
        <div class="modal-box relative flex flex-col h-[400px] bg-neutral-800 border border-neutral-700">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 transition duration-300 hover:text-red-800 cursor-pointer" onclick="modalConfigs.close()"></i>
            <div class="flex flex-col gap-2 mb-2">
                <h1 class="font-silkscreen text-lg">CONFIGURAÇÕES</h1>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
            <div class="flex-1 flex flex-col overflow-y-scroll outline-none gap-2" id="configsSections">
                
            </div>
            <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
        </div>
     </dialog>`

export function attConfigs() {
    document.body.insertAdjacentHTML('beforeend', configsBlock);
    const modalConfigs = document.getElementById('modalConfigs');
    const modalConfigsSections = modalConfigs.querySelector('#configsSections');

    configsSections.forEach(section => {
        let configsSection = `<div class="flex flex-col" data-section="${section}">
                    <h1 class="font-silkscreen text-lg">${section}</h1>
                </div>`;
        modalConfigsSections.innerHTML += configsSection;        
    })

    configs.forEach(config => {
        let configsButton = `<div class="flex items-center justify-start rounded-full transition duration-300 hover:bg-neutral-700 cursor-pointer px-2 pl-4 gap-4" onclick="${config.action}">
                        <i class="hn ${config.icon} text-white text-[24px]"></i>
                        <div class="flex flex-col">
                            <h1 class="font-silkscreen">${config.title}</h1>
                            <p class="font-pixelify-sans text-sm">${config.description}</p>
                            ${config.extraLine}
                        </div>
                    </div>`;
        let section = modalConfigsSections.querySelector(`[data-section="${config.section}"]`);
        section.innerHTML += configsButton;
    })

    document.getElementById('fileInputHandler').addEventListener('change', (event) => {
        uploadDB(event);
    });
};