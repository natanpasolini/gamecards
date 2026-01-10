const meusJogos = [{ year: "2026", title: "Warhammer", img: "spacemarine2.jpg", hours: "20", achievements: "22", maxachievements: "50", platform: "steam", score: "S" }]

meusJogos.forEach(jogo => {
    console.log(`Eu zerei o jogo: ${jogo.year} ${jogo.title} ${jogo.img} ${jogo.hours} ${jogo.achievements} ${jogo.maxachievements} ${jogo.platform} ${jogo.score}`);
    const gamecardHtml =
    `<div class="rounded-xl flex flex-col py-6 px-4 shadow-md max-w-[400px] gamecard-bg">
                    <div class="relative">
                        <div class="px-3 py-0 m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1">
                            <span class="text-white text-3xl leading-none font-micro-5">
                                ${jogo.year}
                            </span>
                        </div>
                        <div class="w-full px-4 py-2">
                            <div class="border-2 rounded">
                                <div class="aspect-video flex justify-center">
                                    <img src="./imgs/games/${jogo.img}" class="aspect-video border border-white rounded object-cover">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <div class="bg-black p-1 w-full justify-center items-center">
                            <h1 class="text-white text-center text-base font-silkscreen">
                                ${jogo.title}
                            </h1>
                        </div>
                        <div class="grid grid-cols-2 w-full">
                            <div class="flex flex-col items-start pt-1 border-2 gap-1">
                                <div class="flex justify-start items-center pl-2 gap-2">
                                    <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                    <span class="text-white leading-none text-3xl font-micro-5" id="gamecard-achievements">
                                        ${jogo.achievements}/${jogo.maxachievements}
                                    </span>
                                </div>
                                <div class="flex justify-start items-center pl-2 gap-2">
                                    <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                    <span class="text-white leading-none text-3xl font-micro-5" id="gamecard-hours">
                                        ${jogo.hours}h
                                    </span>
                                </div>
                            </div>
                            <div class="flex justify-center h-20">
                                <div class="w-full p-2 flex justify-center items-center border-2 border-x-0 platform-${jogo.platform}">
                                    <img src="./imgs/platforms/${jogo.platform}.png" class="object-contain max-w-12">
                                </div>
                                <div class="bg-yellow-300 p-2 flex justify-center items-center w-full border-2">
                                    <span class="text-3xl font-pixelify-sans">
                                        ${jogo.score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.querySelector('#gamelist').innerHTML += gamecardHtml;
});

