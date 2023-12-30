import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  // const res = await callAPI('/cards/?page_id=1&page_size=10', 'GET', null);
  // if (res.ok) {
  //   let body = res.json();
  //   return await body;
  // }

  error(404, 'Not found');
};
