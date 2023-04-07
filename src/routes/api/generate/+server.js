import { generate_pallet } from '$lib/pallet.js';

// hexgpt.xyz/api/generate?prompt="color theme"
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const prompt = url.searchParams.get('prompt');

	console.log(prompt);

	let res = await generate_pallet(prompt);

	//console.log(res)

	return new Response(JSON.stringify(res));
}
