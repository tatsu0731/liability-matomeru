export default function Help() {
    return (
            <section className="flex flex-col gap-y-8 mt-16 px-24">
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-md font-bold text-slate-500">Q. 負債matomeruとは？</h2>
                    <p className="text-slate-700">A. 負債matomeruとは、「忘れずに確実に借りを返す」をコンセプトに作成された貸し借り管理ツールです。負債を発行することで、自身の借りをストックしておくことが可能です。</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-md font-bold text-slate-500">Q. 負債とは？</h2>
                    <p className="text-slate-700">A. 負債とは本来、企業が将来返済する必要があるマイナスの財産、または支払義務や返済義務のあるものを指します。負債matomeruでは、借りをより返す義務のあるものであるということを強調するため負債と呼ぶことにしています。</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-md font-bold text-slate-500">Q. 債権者とは？</h2>
                    <p className="text-slate-700">A. 債権者とは、特定の人に対して金銭の支払いや一定の行為（給付）の要求、並びにそれを受領したり、保持できたりする権利を持つ者のことです。負債matomeruではユーザーが負債を返済する対象者のことを指します。</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-md font-bold text-slate-500">+. 開発裏情報</h2>
                    <p className="text-slate-700">A. <a href="https://docs.google.com/presentation/d/10CHFXMBS9ifVjTU3LFIQpLubzU1fmgrP7_CW7KLpWaw/edit#slide=id.g2f39aa62be7_0_26" className="text-emerald-400 font-bold">Google slide</a>にまとめてあるので確認していただけると泣いて喜びます！</p>
                </div>
            </section>
    );
}
