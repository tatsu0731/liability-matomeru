import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { getThanks } from "../../../utils/supabaseFunction";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Table() {
    const [thanks, setThanks] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        description: string;
        user_id: string
    }[]>([]);
    const [id, setId] = useState<number | null>(null);
    const router = useRouter();
    // ここを条件としてid=router.query.idのデータだけ取得するように変更
    useEffect(() => {
        setId(Number(router.query.id));
        const fetchTargets = async () => {
            // const data = await getThanks();
        let { data: thanks, error } = await supabase
        .from('Thanks')
        .select('*')
        .eq('target_id', router.query.id)
        .is('done', false)
        if (thanks !== null) {
            setThanks(thanks);
        }
        };
        fetchTargets();
    }, [router.query.id]);

    // 日付変換
    const DateToJST = (item: string) => {
        const isoDate = item;
        const date = new Date(isoDate);

        const yyyy = date.getUTCFullYear();
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(date.getUTCDate()).padStart(2, '0');

        const yyyymmdd = `${yyyy}/${mm}/${dd}`;
        return (yyyymmdd);
    };

    const handleRepayDebt = async (id) => {
        const { data, error } = await supabase
        .from('Thanks')
        .update({ done: true })
        .eq('id', id)
        .select()
        router.reload()
    }

    return (
        <section>
                <div className="flex justify-end mt-10 mr-24">
                <Link href={`/${id}/create`}>
                    <button className={`font-bold text-white text-md bg-orange-400 py-2 px-8 bg-orange-4000 rounded-lg shadow hover:bg-orange-600`}>新規作成</button>
                </Link>
                </div>
                <div className="flex flex-col py-4 px-24">
                    <div className="border-t-2 border-x-2 rounded-lg">
                        {thanks.map((thank) => (
                            <div key={thank.id} onClick={() => handleRepayDebt(thank.id)} className=" border-b-2 py-2 px-8 flex flex-col gap-y-4 text-slate-600">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div>
                                            <h2 className="text-xs font-bold"><span className="text-emerald-400">■</span> 返済物</h2>
                                            <p className="text-sm">{thank.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-8">
                                        <div>
                                            <p className="text-sm">{DateToJST(thank.created_at)}</p>
                                        </div>
                                        <Button title={"返済完了"} size={"xs"} color={"emerald"}></Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold">説明</h3>
                                    <p className="text-sm">{thank.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    )
}