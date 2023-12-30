import { writable, type Writable } from 'svelte/store';
import type { SessionUser } from '$lib/models';

export const user: Writable<SessionUser | null> = writable(null)
