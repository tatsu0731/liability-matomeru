import { useRouter } from "next/router";
import { getUserId } from "../../../utils/supabaseFunction";

export default async function AuthCheck() {
    const isLoggedIn = await getUserId();

    const router = useRouter()

    if (!isLoggedIn) {
        router.push("/auth/login");
    }
}