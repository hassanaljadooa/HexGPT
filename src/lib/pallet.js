import { ChatGPTAPI } from 'chatgpt';

export async function generate_pallet(reqParams) {
	let basePrompt = `Generate an RGB color palette based on this given text description (single sentence, paragraph, or list of keywords) and output a JSON array. 
	Each object in the array represents a single color, containing 'hex' and 'name'.
	The number of colors can vary, the color names should accurately represent the colors. here's the text description: DESC_PLACEHOLDER`

	const api = new ChatGPTAPI({
		apiKey: process.env.OPENAI_API_KEY,
		completionParams: {
			temperature: 0.40,
			//top_p: reqParams.top_p,
			n: reqParams.generationCount // number of generations to make per prompt 1 prompt = 4 unique generations
		}
	});

	const res = await api.sendMessage(basePrompt.replace('DESC_PLACEHOLDER', reqParams.prompt));
 
	console.log(basePrompt.replace('DESC_PLACEHOLDER', reqParams.prompt))
	console.log(res)

	return res;
}
