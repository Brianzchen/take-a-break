export const toHours = milliseconds => Math.floor(milliseconds / 3600000);

export const toMinutes = milliseconds => Math.floor((milliseconds / 60000) % 60);

export const toSeconds = milliseconds => Math.floor((milliseconds / 1000) % 60);
