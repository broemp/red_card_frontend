import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const session = event.cookies.get("session")

  if (session) {
    throw redirect(301, "/me")
  }
};

export const actions: Actions = {
  signup: async ({ request, fetch }) => {
    const formData: FormData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");

    if (password != password_confirm) {

    }

    const body = JSON.stringify({ username, password, first_name, last_name })

    const res = await fetch("http://backend/users/register", {
      body,
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    if (res.ok) {
      throw redirect(301, "/login")
    }

    return {
      error: await res.text()
    }

  }
}
