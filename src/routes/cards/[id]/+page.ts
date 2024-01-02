import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


export const load: PageLoad = async ({ params, fetch }) => {

  const res = await fetch(PUBLIC_BACKEND_URL + '/cards/' + params.id, {
    method: "GET",
    mode: "no-cors"
  });

  if (!res.ok) {
    return redirect(300, "/")
  }

  return {
    card: await res.json(),
    res: res.status
  }
};
