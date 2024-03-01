'use client'
import Link from 'next/link'
import styles from './NavMenu.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'

function SignInButton() {
	return <button onClick={() => signIn()}>Sign in</button>
}

function SignOutButton() {
	return <button onClick={() => signOut()}>Sign out</button>
}

export default function NavMenu() {
	const { data: session } = useSession()
	const signedIn = session !== null
	return (
		<div>
			{!signedIn ? (
				<SignOutButton />
			) : (
				<>
					<Link href='/' passHref>
						<button>Home</button>
					</Link>
					<SignInButton />
				</>
			)}
		</div>
	)
}
