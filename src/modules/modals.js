const modalGuia = `
<dialog class="modal" id="modalGuia">
        <div class="modal-box bg-neutral-800 border border-neutral-700 flex flex-col gap-2 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="modalGuia.close()"></i>
            <div class="flex flex-col w-full">
                <h1 class="font-silkscreen font-bold text-lg">Guia do Usuário</h1>
            </div>
            <span class="w-full h-[2px] rounded-full bg-neutral-500"></span>
            <div class="flex flex-col gap-4">
                <p class="font-pixelify-sans text-md">
                    Você pode criar seus proprios cards de jogo clicando no <b>novo jogo</b> (desaparece após adicionar um jogo) ou no botão em formato de cruz na toolbar.
                </p>
                <p class="font-pixelify-sans text-md">
                    O template dos gamecards consiste em uma imagem (colocada através de um url), titulo, ano (fica a sua escolha ser ano em que jogou ou ano do jogo), conquistas (alcanças e maximas), horas de jogo e por fim, uma nota.
                </p>
                <div class="grid grid-cols-2 w-full">
                    <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                        <div class="flex justify-start items-center pl-2 gap-2">
                            <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                            <span class="text-white leading-none text-[12px] font-pixelify-sans select-none">
                                Conquistas
                            </span>
                        </div>
                        <div class="flex justify-start items-center pl-2 gap-2">
                            <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                            <span class="text-white leading-none text-[12px] font-pixelify-sans select-none">
                                Horas Jogadas
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center h-20">
                        <div class="p-2 flex justify-center items-center w-full border-2 border-black score-S">
                            <span class="text-3xl font-pixelify-sans select-none">
                                NOTA
                            </span>
                        </div>
                    </div>
                </div>
                <p class="font-pixelify-sans text-md">
                    As notas vão de F a SSS, sendo F a pior.
                </p>
                <div class="flex justify-center items-center gap-5 w-full">
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-F">
                        <span class="text-3xl font-pixelify-sans select-none">
                            F
                        </span>
                    </div>
                    <i class="hn hn-arrow-right text-white text-3xl"></i>
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-SSS">
                        <span class="text-3xl font-pixelify-sans select-none">
                            SSS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
`

export function injectModals() {
    document.body.innerHTML += modalGuia;
    document.getElementById('modalGuia').showModal();
}