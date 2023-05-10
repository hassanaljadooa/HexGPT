import { SvelteToast, toast } from '@zerodevx/svelte-toast';
import {currentSelectionIdx} from "$lib/stores.js";

let successMessage = function (message, duration) {
	const toasts = new SvelteToast({
		target: document.body
	});
	toast.push(message, {
		theme: {
			'--toastColor': 'mintcream',
			'--toastBackground': 'rgba(72,187,120,0.9)',
			'--toastBarBackground': '#2F855A'
		},
		duration: duration
	});
};
let failMessage = function (message, duration) {
	const toasts = new SvelteToast({
		target: document.body
	});
	toast.push(message, {
		theme: {
			'--toastColor': 'mintcream',
			'--toastBackground': 'rgb(218, 148, 19)',
			'--toastBarBackground': '#da9413'
		},
		duration: duration
	});
};

// given an ID of a modal, the function will automatically determine to open or/ close it.
function actuateModal(elemId) {
	let element = document.getElementById(elemId)

	if (element.classList.contains('modal-open')) {
		element.classList.remove('modal-open')
	} else {
		element.classList.add('modal-open')
	}
}
function copyToClipboard(data) {
	navigator.clipboard.writeText(data).then(
		() => {
			successMessage(`Copied ${typeof data === 'object' ? JSON.stringify(data) : data} to clipboard`, 1000);
		},
		(err) => {
			console.error('Could not copy text: ', err);
			//message.error(`Failed to copy to clipboard, ${err}`)
		}
	);
}

// converts hex color codes to RGBA channels
function hexToRGBA(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToHSL(hex) {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	h = Math.round(h * 360);
	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return `hsl(${h}, ${s}%, ${l}%)`;
}

// extracts JSON data from ChatGPT response
/*function extractColorArray(jsonString) {
	// Remove newlines and whitespace
	const sanitizedJsonString = jsonString.replace(/[\n\r\s]+/g, '');

	// Find the start and end of the JSON object
	const jsonStart = sanitizedJsonString.indexOf('[');
	const jsonEnd = sanitizedJsonString.lastIndexOf(']') + 1;

	// Extract the JSON object
	//const extractedJsonString = sanitizedJsonString.slice(jsonStart, jsonEnd);

	try {
		// Parse the JSON object
		const colors = JSON.parse(sanitizedJsonString);
		return colors;
	} catch (error) {
		console.log(error);
		return false;
	}
}*/

function extractColorArray(inputString) {
	// Extract JSON array from the input string using a regular expression
	const jsonArrayStr = inputString.match(/\[([^\]]*)\]/g) || [];

	if (jsonArrayStr !== null) {
		// Parse JSON array string to an array
		const jsonArray = JSON.parse(jsonArrayStr[0]);
		console.log(jsonArray)

		return jsonArray;
	}
}


export default {
	successMessage,
	failMessage,
	copyToClipboard,
	hexToHSL,
	hexToRGBA,
	extractColorArray,
	actuateModal
};
