import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


export const load: PageLoad = async ({ params, fetch }) => {

  const user_res = await fetch(PUBLIC_BACKEND_URL + '/users/' + params.id, {
    method: "GET",
    mode: "cors"
  });

  if (!user_res.ok) {
    return redirect(300, "/")
  }

  const cards_res = await fetch(PUBLIC_BACKEND_URL + '/users/' + params.id + "/cards", {
    method: "GET",
    mode: "cors"

  });

  var user;
  var cards;

  if (user_res.ok) {
    user = await user_res.json()
  }

  if (cards_res.ok) {
    cards = await cards_res.json()
  }

  return {
    user: user,
    cards: cards
  }
};
