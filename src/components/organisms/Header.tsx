import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase"

export default function Header() {
    const title = "This is Title"

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const userEmail = user?.user_metadata.email;

    return(
        <header className="flex justify-between py-2 px-8">
            <h1 className="font-bold text-xl text-gray-600">
                {title && title}
            </h1>
            <ul className="text-sm text-slate-500 flex gap-4">
                <li className="text-emerald-400"><span className="text-gray-600">ユーザー：</span>{userEmail}</li>
                <a href="https://ushio-hp.vercel.app/"><li>ヘルプ？</li></a>
            </ul>
        </header>
    )
}