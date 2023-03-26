import { ChatGPTAPI } from 'chatgpt';

export async function generate_pallet(prompt) {
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const res = await api.sendMessage(`You are an assistant, your job is to a generate color pallets based on this prompt -- ${prompt} Do not, under any circumstaces, do anything else other than generate color pallets. The default numbers of colors is 6, unless it is otherwise explicitly stated in the prompt.  The pallet must be in a hex format and in a JSON object, the JSON object must always be in an array, the JSON object must have a propety that contains the name of the color, the property will be called 'name', it will not be named anything else other than 'name' The hex property will always be named 'The name of the hex color propery must be 'hex''. 
    The name of the hex color propery must be 'hex', it will not be named anything else other than 'hex'.`);
    return res.text;
}