import { Navbar } from "@/components/layout/navbar"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1 pt-16" id="main-content">
        {children}
      </main>
    </div>
  )
}
