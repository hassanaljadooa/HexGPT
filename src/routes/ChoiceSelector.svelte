<script>
    import {choices, currentSelectionIdx} from "$lib/stores.js";
    import {onMount} from "svelte";

    let currentChoices = [];
    let currentSelection = 0;

    onMount(() => {
        choices.subscribe(colorChoices => {
            currentChoices.length > 0 ? currentChoices.splice(0, currentChoices.length) : []
            colorChoices.forEach(color => {
                currentChoices.push(color)
            })

            currentChoices = currentChoices
        })
        currentSelectionIdx.subscribe(selectionIdx => {
            currentSelection = selectionIdx
        })
    })
</script>
<div class="bg-white rounded-lg shadow-lg p-4 w-full max-w-6xl mb-8 space-y-4">
    <h2 class="font-bold text-left px-2 text-xl">Pallet Choices</h2>
    <div class="container bg-slate-100 rounded-lg p-2">
        <div class="space-y-2">
            {#if currentChoices.length > 0}
                {#each currentChoices as choice, choiceIdx}
                    <div class="bg-white shadow-lg rounded-lg pb-2 hover:bg-white/30 cursor-pointer" on:click={() => {currentSelectionIdx.set(choiceIdx)}}>
                        <h3 class="font-bold  p-2 text-xl">{@html currentSelection == choiceIdx ? '<i class="fa-solid fa-check"></i>' : ''} Pallet {choiceIdx + 1}</h3>
                        <div class="w-full h-16 flex justify-between overflow-x-auto">
                            {#each choice as {hex}}
                                <div class="w-1/5 flex items-center justify-center mb-2 w-full" style="background-color: {hex}">
                                    <div class="rounded backdrop-opacity-10 backdrop-invert bg-black/30">
                                        <p class="p-2 text-center text-ellipsis text-white font-bold">{hex}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            {:else}
                <p class="text-center">There are no pallets to display.</p>
            {/if}
        </div>
    </div>
</div>
