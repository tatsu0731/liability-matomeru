export default function Alert() {
    return (
        <section className="border-2 border-emerald-300 py-4 px-16 rounded-md">
            <h2 className="text-lg font-bold mb-1 text-slate-600">本当に消しても良いですか？</h2>
            <p className="text-sm mb-4 text-slate-500">削除対象の債権者には未返済の負債が存在します。</p>
            <div className="flex justify-end gap-2">
                <button className="py-1 px-4 rounded-sm text-slate-600 hover:bg-slate-200 ">戻る</button>
                <button className="py-1 px-4 rounded text-white bg-emerald-400 hover:bg-emerald-600">消去</button>
            </div>
        </section>
    )
}