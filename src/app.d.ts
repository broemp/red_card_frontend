// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { SessionUser } from './models';

declare global {
  namespace App {
    interface Locals {
      jwt: string
      user: SessionUser
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}
