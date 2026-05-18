'use client'
import { useContext} from 'react'
import { usePathname } from 'next/navigation'
import { ModeContext } from '@/store/modeContext'
import { UserAuthenticationContext } from '@/store/UserAuthenticationContext'
import DesctopNavigation from '@/components/navigation/DesctopNavigation'
import MobileNavigationHandler from '@/components/navigation/MobileNavigationHandler'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { setNavigationBg } from '@/util/navigation-background'

export default function MainNavigation() {
	const modeCtx = useContext(ModeContext)
	const isAuthCtx = useContext(UserAuthenticationContext)
	const pathname = usePathname()
	const navBg = setNavigationBg(pathname)

	return (
		<nav className={'relative flex flex-row w-screen h-32 bg-(--navigationBackground) z-5 ' + navBg}>
			{modeCtx.mobNavigationIsOpen ? (
				<MobileNavigation
					onCloseNavigation={modeCtx.handleMobNavigationIsOpen}
					userId={isAuthCtx.user}
					token={isAuthCtx.token}
				/>
			) : (
				<DesctopNavigation userId={isAuthCtx.user} token={isAuthCtx.token} />
			)}
			<MobileNavigationHandler
				isOpen={modeCtx.mobNavigationIsOpen}
				onOpenNavigation={modeCtx.handleMobNavigationIsOpen}
			/>
		</nav>
	)
}
