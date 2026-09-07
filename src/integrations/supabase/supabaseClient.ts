/**
 * Compatibility shim: the repo's Nucleus modules import
 * `./supabase/supabaseClient`. Re-export the generated client so all
 * code shares one connection with the correct keys.
 */
export { supabase } from "./client";
