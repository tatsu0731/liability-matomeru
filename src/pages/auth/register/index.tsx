import { useState } from "react"
import { supabase } from "../../../../utils/supabase"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Register() {
    const [mailadress, setMailadress] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter();

    console.log(password)
    console.log(mailadress)

    const handleSignUp = async (e: any) => {
        e.preventDefault(); // デフォルトのフォーム送信を防ぐ
        try {
            const { error } = await supabase.auth.signUp({
                email: mailadress,
                password: password,
            });
            if (error) throw error;
            console.log('サインアップに成功しました！');
            await router.push("/")
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignUp} className="py-20 px-32 w-600 h-600 border-2 border-gray-300 rounded-2xl">
                <div className="flex flex-col items-center gap-y-4">
                    <h2 className="text-4xl font-bold text-emerald-400">負債-matomeru</h2>
                    <h2 className="text-xl font-bold text-slate-500">Sign Up</h2>
                </div>
                <div className="mt-10">
                    <label htmlFor="email" className="text-xs block font-bold text-slate-600">メールアドレス</label>
                    <input type="email" id="email" value={mailadress} placeholder="メールアドレスを入力" onChange={(e) => setMailadress(e.target.value)} className="border-2 border-gray-300 rounded-md p-1 w-full"/>
                </div>
                <div className="mt-10">
                    <label htmlFor="password" className="text-xs block font-bold text-slate-600">パスワード</label>
                    <input type="password" id="password" value={password} placeholder="パスワードを入力" onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-300 rounded-md p-1 w-full"/>
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="bg-emerald-400 text-white px-24 py-2 font-bold rounded-full hover:bg-emerald-600 mt-10">登録</button>
                    <Link href="/auth/login">
                        <p className="text-slate-600 mt-2 text-xs">LogInする</p>
                    </Link>
                </div>
            </form>
        </section>
    )
}
