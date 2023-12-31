import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { jwt } from '$lib/store';
import { get } from 'svelte/store';


export const load: PageLoad = async ({ params, fetch }) => {

  const res = await fetch(PUBLIC_BACKEND_URL + '/cards/' + params.id, {
    method: "GET",
  });

  if (res.ok) {
    return res.json()
  }
};
