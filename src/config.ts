/* **Do not add any secrets to app configuration** */

// Ex: export const config = { NAME: get(process.env.NAME, <sane default>) };
export const get = (value: string | null, def = '') => (value ? value : def);

export const config = {
  REMOVE_ME: get(null, 'Remove me from config.ts. I am just an example'),
};
