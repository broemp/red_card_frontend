export const prerender = true;

import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {

  const res = await fetch(PUBLIC_BACKEND_URL + '/cards/?page_id=1&page_size=10', {
    method: "GET",
  });

  if (res.ok) {
    return {
      cards: await res.json(),
    };
  }
};
