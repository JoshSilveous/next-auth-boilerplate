'use client'
import Link from 'next/link'
import styles from './NavMenu.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const pages = [
	{ name: 'Home', href: '/' },
	{ name: 'Transactions', href: '/transactions' },
	{ name: 'Categories', href: '/categories' },
	{ name: 'Accounts', href: '/accounts' },
]

export default function NavMenu() {
	const { data: session } = useSession()
	const pathname = usePathname()
	const signedIn = session !== null
	return (
		<div className={styles.menu}>
			{!signedIn ? (
				<SignInButton />
			) : (
				<>
					<div className={styles.link_container}>
						{pages.map((page, index) => {
							return (
								<Link key={index} href={page.href} passHref>
									<div className={pathname === page.href ? styles.current : ''}>
										<div className={styles.text}>{page.name}</div>
									</div>
								</Link>
							)
						})}
					</div>
					<SignOutButton />
				</>
			)}
		</div>
	)
}

function SignInButton() {
	return (
		<button className={styles.sign_in} onClick={() => signIn()}>
			Sign in
		</button>
	)
}

function SignOutButton() {
	return (
		<button className={styles.sign_out} onClick={() => signOut()}>
			Sign out
		</button>
	)
}
