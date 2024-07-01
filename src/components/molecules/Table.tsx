import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { getThanks } from "../../../utils/supabaseFunction";

export default function Table() {

    const [thanks, setThanks] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        description: string;
        user_id: string
    }[]>([]);

    useEffect(() => {
        const fetchTargets = async () => {
            const data = await getThanks();
            if (data !== null) {
                setThanks(data);
            }
        };
        fetchTargets();
    }, []);

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

    return (
        <section>
                <div className="flex justify-end mt-10 mr-24">
                    <Button title={"新規作成"} size={"md"} color={"orange"}></Button>
                </div>
                <div className="flex flex-col py-4 px-24">
                    <div className="border-t-2 border-x-2 rounded-lg">
                        {thanks.map((thank) => (
                            <div key={thank.id} className=" border-b-2 py-2 px-8 flex flex-col gap-y-4 text-slate-600">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div>
                                            <h2 className="text-xs font-bold"><span className="text-emerald-400">■</span> タイトル</h2>
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
                                    <h3 className="text-xs font-bold">返済物</h3>
                                    <p className="text-sm">{thank.title}</p>
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