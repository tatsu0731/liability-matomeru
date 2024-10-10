import Header from "@/components/organisms/Header"
import Sideber from "@/components/organisms/Sideber"

export default function RootLayout({
    children,
    }: {
        children: React.ReactNode
    }) {
        return (
        <html lang="ja">
            <body className="flex">
                <Sideber />
                <div className="flex flex-col w-full">
                    <Header />
                    <main>{children}</main>
                </div>
            </body>
        </html>
        )
    }