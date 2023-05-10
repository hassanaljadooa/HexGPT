import { generate_pallet } from '$lib/pallet.js';

// hexgpt.xyz/api/generate?prompt="color theme"
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	let requestParameters = {
		prompt: url.searchParams.get('prompt'),
		generationCount: parseFloat(url.searchParams.get('count')) > 5 ? 4 : parseFloat(url.searchParams.get('count')), // defines the number of ChatGPT completions based on a single prompt,
		//top_p: parseFloat(url.searchParams.get('top_p')) // an alternative parameter to temperature
	};

	let res = await generate_pallet(requestParameters);

	return new Response(JSON.stringify(res));
}
