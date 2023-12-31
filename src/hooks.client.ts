import type { Handle } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { jwt, user } from '$lib/store';


export const handle: Handle = async ({ event, resolve }) => {
  if (get(jwt) === null) {
    user.set(null)
  } else {
    user.set({
      id: "0",
      username: "Unknown",
      firstname: "N",
      lastname: "A"
    })
  }

  const response = await resolve(event);
  return response;
};
