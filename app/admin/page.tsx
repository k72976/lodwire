import { createClient } from "@/lib/supabase/server";

export default async function Admin(){
      const supabase = await createClient();
const { data: users, error } = await supabase.from("users").select();
console.log("Users:", users);
console.log("Error:", error);
  return (
    <div>
      /* {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <pre>{JSON.stringify(users, null, 2)}</pre> */
    </div>
  )
}
