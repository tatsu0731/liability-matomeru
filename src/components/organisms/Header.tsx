import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase"
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [title, setTitle] = useState<string | null>("債権者");

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
                <Link href={"/help"}>
                    <li className="flex gap-1">
                    <span>ヘルプ：</span>
                    <Image src={"help-circle.svg"} width={20} height={20} alt=""/>
                    </li>
                </Link>
            </ul>
        </header>
    )
}