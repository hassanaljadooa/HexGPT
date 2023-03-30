import { SvelteToast, toast } from '@zerodevx/svelte-toast'


let successMessage = function (message, duration) {
    const toasts = new SvelteToast({
        target: document.body
    })
    toast.push(message, {
        theme: {
            '--toastColor': 'mintcream',
            '--toastBackground': 'rgba(72,187,120,0.9)',
            '--toastBarBackground': '#2F855A'
        },
        duration: 2000
    })
}
let failMessage = function (message, duration) {
    const toasts = new SvelteToast({
        target: document.body
    })
    toast.push(message, {
        theme: {
            '--toastColor': 'mintcream',
            '--toastBackground': 'rgb(218, 148, 19)',
            '--toastBarBackground': '#da9413'
        },
        duration: 2000
    })
}
function copyToClipboard(data) {
    navigator.clipboard.writeText(data).then(
        () => {
            //console.log(`Copied ${data} to clipboard`);
            //message.success(`Copied ${data} to clipboard.`)

            successMessage(`Copied ${data} to clipboard`, 1000)
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
function extractColorArray(jsonString) {
    const jsonStart = jsonString.indexOf('[');
    const jsonEnd = jsonString.lastIndexOf(']') + 1;
    const extractedJsonString = jsonString.slice(jsonStart, jsonEnd);
    try {
        return JSON.parse(extractedJsonString);
    } catch (error) {
        return false
    }
}

export default {successMessage, failMessage, copyToClipboard, hexToHSL, hexToRGBA, extractColorArray}