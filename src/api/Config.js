
export let GOODREADS_API_KEY = process.env.GOODREADS_API_KEY;

export const API_SETTINGS_CONFIG = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest' // Tell server that it is an AJAX request.
    }
};