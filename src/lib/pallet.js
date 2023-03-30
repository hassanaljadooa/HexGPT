import { ChatGPTAPI } from 'chatgpt';

export async function generate_pallet(prompt) {
    let systemMessage = "You are a color pallet generator, that is your only function. \n" +
        "You will be given a prompt that will specify the requirements for a color pallet to be generated as well as the number of colors the pallet must include, the minimum number of colors in the pallet is 2. The pallet must be a JSON array, where each object in the array is an individual color of the overall pallet. This is an example of the response you are expected to generate -- \n" +
        "[\n" +
        "        { hex: '#EF4444', name: 'red-500' },\n" +
        "        { hex: '#F59E0B', name: 'yellow-500' },\n" +
        "        { hex: '#10B981', name: 'green-500' },\n" +
        "        { hex: '#3B82F6', name: 'blue-500' },\n" +
        "        { hex: '#9333EA', name: 'indigo-500' },\n" +
        "        { hex: '#EC4899', name: 'pink-500' }\n" +
        "] The color must be in a HEX format, the property in the object must be named 'hex'. The object must also include the english name of the color, the property in the object must be named 'name'. "

    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY,
        systemMessage: systemMessage
    });

    const res = await api.sendMessage(prompt);
    //console.log(res.text)
    return res.text;
}