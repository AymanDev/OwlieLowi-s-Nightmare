const query = new URLSearchParams(window.location.search);

export const IS_DEBUG = Boolean(query.get('debug'));
