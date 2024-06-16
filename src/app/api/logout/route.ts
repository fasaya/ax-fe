import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  // remove cookie
  cookies().delete("userToken")

  redirect("/login")
}
