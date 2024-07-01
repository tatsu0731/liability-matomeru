import Link from "next/link";
import Article from "../atoms/Article";
import Title from "../atoms/Title";
import { getTargets } from "../../../utils/supabaseFunction";

import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";

export default function Sideber() {
    const [targets, setTargets] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        user_id: string
    }[]>([]);

    useEffect(() => {
        const fetchTargets = async () => {
            const data = await getTargets();
            if (data !== null) {
                setTargets(data);
            }
        };
        fetchTargets();
    }, []);

    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.reload();
    };

    return (
    <div className=" w-60 h-screen px-4 bg-emerald-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Link href="/">
            <Title />
            </Link>
            <div className="">
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債務対象一覧</h2>
                {targets.map((target) => (
                    <Link href={`/[${target.id}].tsx`} key={target.id}>
                        <p>{target.title}</p>
                    </Link>
                ))}

            </div>
        </div>
        <button className="mb-4 text-sm" onClick={() => signOut()}>ログアウト</button>
    </div>
    )
}