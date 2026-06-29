const API_BASE = '/api';

async function fetchJson(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${res.status})`);
    }
    return res.json();
}

export const deactivateAccount = () =>
    fetchJson('/users/me/deactivate', { method: 'POST' });

export const deleteAccount = ({ password, immediate = false }) =>
    fetchJson('/users/me', {
        method: 'DELETE',
        body: JSON.stringify({ password, immediate }),
    });