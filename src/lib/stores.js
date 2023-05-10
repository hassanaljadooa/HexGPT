import {writable} from "svelte/store";

export let choices = writable([])
export let currentSelectionIdx = writable(0)