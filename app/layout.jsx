import { cookies } from 'next/headers'
import './global.css'
import ModeContextProvider from '@/store/modeContext'
import UserAuthenticationContextProvider from '@/store/UserAuthenticationContext'
import MainNavigation from '@/components/navigation/MainNavigation'
import Body from '@/components/header/Body'

export const metadata = {
	title: 'Wordlex',
	description:
		'Create and add your own flashcards to learn foreign languages. Twórz i dodawaj swoje fiszki, żeby uczyć się języków obcych.',
}

export default async function RootLayout({ children, params }) {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value || null
	const loginSession = cookieStore.get('login_session')?.value || null

	return (
		<html lang='en'>
			<ModeContextProvider>
				<UserAuthenticationContextProvider initialToken={token} initialUser={loginSession}>
					<Body>
						<main>
							<MainNavigation/>
							{children}
						</main>
					</Body>
				</UserAuthenticationContextProvider>
			</ModeContextProvider>
		</html>
	)
}
