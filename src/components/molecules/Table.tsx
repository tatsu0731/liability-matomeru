import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

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

    // 本日の日付を取得
    const getToday = () => {
        return new Date();
    };

    // 渡された日付が14日以上前であるかを確認する関数
    const isMoreThan14DaysAgo = (item: string) => {
        const itemDate = new Date(item); // 渡された日付をDateオブジェクトに変換
        const today = getToday(); // 本日の日付

        // 本日から14日前の日付を計算
        const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000); // 14日分のミリ秒を減算

        // 日付が14日以上前かを比較
        if (itemDate < fourteenDaysAgo) {
            return true; // 14日以上前
        } else {
            return false; // 14日以内
        }
    };

    const handleRepayDebt = async (id: number) => {
        const { data, error } = await supabase
        .from('Thanks')
        .update({ done: true })
        .eq('id', id)
        .select()

        if (!error) {
            setThanks((prevThanks) => prevThanks.filter((thank) => thank.id !== id));
        }
    }

    return (
        <section>
                <div className="flex justify-end mt-10 mr-24">
                <Link href={`/${id}/create`}>
                    <button className={`font-bold text-white text-md bg-orange-400 py-2 px-8 bg-orange-4000 rounded-lg shadow hover:bg-orange-600`}>新規作成</button>
                </Link>
                </div>
                <div className="flex flex-col py-4 px-24 gap-4">
                    {thanks.map((thank) => (
                        <div key={thank.id} className={`border-2 rounded-md ${isMoreThan14DaysAgo(thank.created_at) ? "border-red-400" : ""}`}>
                            <div className="py-2 px-8 flex flex-col gap-y-4 text-slate-600">
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
                                        <button className={`font-bold text-white text-xs bg-emerald-400 py-2 px-8 bg-orange-4000 rounded-lg shadow hover:bg-emerald-600`} onClick={() => handleRepayDebt(thank.id)}>返済完了</button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold">説明</h3>
                                    <p className="text-sm">{thank.description}</p>
                                </div>
                                {isMoreThan14DaysAgo(thank.created_at) &&
                                    <div className=" border-2 border-red-400 rounded py-4 bg-stone-100 flex pl-4">
                                        <Image src={"alert-circle.svg"} width={20} height={20} alt="警告"/>
                                        <div className="text-sm font-bold text-red-400 ml-4">負債発行から14日以上過ぎています！迅速に返済手続きをしましょう！</div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </section>
    )
}