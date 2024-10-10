import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../../utils/supabase";


export default function Create() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const router = useRouter();
    console.log(router.query.id)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
            .from('Thanks')
            .insert([
            { title: title, description: description, done: false, target_id: router.query.id },
            ])
            .select()
            router.push(`/${router.query.id}`);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center">
            <form className="w-800">
                <div className="flex flex-col items-center gap-y-4">
                    <h2 className="text-xl font-bold text-slate-500">負債発行</h2>
                </div>
                <div className="mt-10">
                    <label htmlFor="email" className="text-xs block font-bold text-slate-600">返済内容：何をもって償うのか</label>
                    <input type="email" id="email" value={title} placeholder="返済内容を入力" onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-300 rounded-md p-1 w-full"/>
                </div>
                <div className="mt-10">
                    <label htmlFor="password" className="text-xs block font-bold text-slate-600">説明：負債発生の経緯など</label>
                    <textarea id="password" value={description} placeholder="説明を入力" onChange={(e) => setDescription(e.target.value)} rows={4} className="border-2 border-gray-300 rounded-md p-1 w-full"/>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-orange-400 text-white text-md py-2 font-bold rounded-md hover:bg-orange-600 mt-10 w-40" onClick={handleSubmit}>確定</button>
                </div>
            </form>
        </div>
    );
}
