import { BACKEND_URL } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import type { SessionUser } from './models';

export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.cookies.get('Authorization')
  const token = cookie?.split(" ")!
  event.locals.user = getUser(token[1])!
  return resolve(event)
};

// Replace backend with real url from env
// Add JWT to fetch request
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {

  if (request.url.startsWith(BACKEND_URL)) {
    request.headers.set('Authorization', event.locals.jwt);
  }

  return fetch(request);
};

function getUser(token: string | undefined) {
  if (!token) {
    return
  }
  var decoded = jwt.decode(token, { json: true })
  console.log(JSON.stringify(decoded))

  var username = decoded?.username

  var userid = decoded?.sub?.toString()
  const user: SessionUser = {
    id: userid!,
    username: username,
    firstname: '',
    lastname: ''
  }

  console.log(JSON.stringify(user))

  return user
}
