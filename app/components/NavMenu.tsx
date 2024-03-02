'use client'
import Link from 'next/link'
import styles from './NavMenu.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Greeting from './Greeting'

const pages = [
	{ name: 'Home', href: '/' },
	{ name: 'Transactions', href: '/transactions' },
	{ name: 'Categories', href: '/categories' },
	{ name: 'Accounts', href: '/accounts' },
]

export default function NavMenu() {
	const { data: session } = useSession()
	const pathname = '/' + usePathname().split('/')[1]
	const linksRef = useRef<HTMLDivElement>(null)
	const linkUnderlineRef = useRef<HTMLDivElement>(null)

	const signedIn = session !== null

	useEffect(() => {
		const linksElemArray = linksRef.current!.childNodes as NodeListOf<HTMLDivElement>
		const linkUnderlineElem = linkUnderlineRef.current!

		const currentPageIndex = pages.findIndex((page) => page.href === pathname)

		if (currentPageIndex !== -1) {
			const currentLinkElem = linksElemArray[currentPageIndex]

			linkUnderlineElem.style.width = `${currentLinkElem.offsetWidth}px`
			linkUnderlineElem.style.left = `${currentLinkElem.offsetLeft}px`
		} else {
			linkUnderlineElem.style.width = '0px'
			linkUnderlineElem.style.left = '0px'
		}
	}, [pathname])

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

	function LinksContainer() {
		return pages.map((page, index) => {
			return (
				<Link key={index} href={page.href} passHref>
					<div className={styles.text}>{page.name}</div>
				</Link>
			)
		})
	}

	return (
		<div className={styles.menu}>
			{!signedIn ? (
				<SignInButton />
			) : (
				<>
					<div className={styles.link_container}>
						<div className={styles.links} ref={linksRef}>
							<LinksContainer />
						</div>
						<div className={styles.link_underline} ref={linkUnderlineRef} />
					</div>
					<div className={styles.gap} />
					<Greeting session={session} />
				</>
			)}
		</div>
	)
}
