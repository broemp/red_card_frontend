import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { SessionUser } from '$lib/models';

export const user: Writable<SessionUser | null> = localStorageStore('user', null);
export const jwt: Writable<String | null> = localStorageStore('jwt', null);
export const event: Writable<String | null> = localStorageStore('string', null);
