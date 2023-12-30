import { redirect, fail } from "@sveltejs/kit";
import { BACKEND_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from "./$types";
import { writable } from "svelte/store";


export const load: PageServerLoad = async ({ cookies }) => {
  const session = cookies.get("Authorization")

  if (session) {
    throw redirect(301, "/")
  }
};

export const actions = {
  login: async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return { success: false }
    }

    const body = JSON.stringify({ username, password })

    const res = await fetch(BACKEND_URL + "/users/login", {
      body,
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    if (res.ok) {
      const session = await res.json()
      cookies.set("Authorization", "Bearer " + session.access_token!, {
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });

      const user = writable("")


      return { success: true }
    } else {
      return fail(400, { incorrect: true })
    }

  }
} satisfies Actions;
