import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase"
import { useRouter } from "next/router";

export default function Header() {
    const [user, setUser] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>("債務者");

    const router = useRouter();

    const userEmail = user?.user_metadata.email;

    useEffect(() => {

        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        const fetchTargets = async () => {
            let { data, error } = await supabase
                .from('Targets')
                .select('title')
                .eq('id', router.query.id)
                // ここの書き方で本当にいいのだろうか
            if (data && data.length > 0) {
                setTitle(data[0].title);
            }
        }
        fetchUser();
        fetchTargets();
    }, [router, userEmail]);
    return(
        <header className="flex justify-between py-2 px-8">
            <h1 className="font-bold text-xl text-gray-600">
                {title && title}への負債一覧
            </h1>
            <ul className="text-sm text-slate-500 flex gap-4">
                <li className="text-emerald-400"><span className="text-gray-600">ユーザー：</span>{userEmail}</li>
                <a href="https://ushio-hp.vercel.app/"><li>ヘルプ？</li></a>
            </ul>
        </header>
    )
}