import Link from "next/link"
import { logout } from "~/lib/auth.client"
import { APP_NAME } from "~/lib/env"
import { useStore } from "~/lib/store"

export function MainLayout({
  isLoggedIn,
  children,
  region,
}: {
  isLoggedIn: boolean
  children?: React.ReactNode
  region: string | null
}) {
  const setLoginModalOpened = useStore((store) => store.setLoginModalOpened)

  const links: Array<{ text: string; href?: string; onClick?: () => void }> =
    isLoggedIn
      ? [
          {
            text: "Dashboard",
            href: "/dashboard",
          },
          {
            text: "Log out",
            onClick() {
              logout()
            },
          },
        ]
      : [
          {
            text: "Log in",
            onClick() {
              setLoginModalOpened(true)
            },
          },
        ]
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="-mt-20">
          <div className="max-w-screen-md mx-auto px-5">
            <div>
              <span className="inline-block text-3xl lg:text-7xl px-3 rounded-lg py-2 font-bold bg-indigo-600 text-white">
                {APP_NAME}
              </span>
            </div>
            <div className="italic text-zinc-500 text-sm mt-1">
              ..is under early testing, don{`'`}t use this app in production.
            </div>
            <div className="space-x-5 mt-10">
              {links.map((link) => {
                if (link.href) {
                  return (
                    <Link href={link.href} key={link.text}>
                      <a className="font-bold nav-link underline">
                        {link.text}
                      </a>
                    </Link>
                  )
                }
                return (
                  <button
                    type="button"
                    className="font-bold nav-link underline"
                    onClick={link.onClick}
                    key={link.text}
                  >
                    {link.text}
                  </button>
                )
              })}
            </div>
            <div className="mt-10 text-zinc-300 text-xs">
              <span className="uppercase">Region: {region}</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}