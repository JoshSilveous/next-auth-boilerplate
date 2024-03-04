'use client'
import Link from 'next/link'
import styles from './NavMenu.module.scss'
import { signIn, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import GreetingMenu from './GreetingMenu'

export default function NavMenu() {
	const { data: session } = useSession()
	const pathname = '/' + usePathname().split('/')[1]
	const linksRef = useRef<HTMLDivElement>(null)
	const linkUnderlineRef = useRef<HTMLDivElement>(null)
	const signedIn = session !== null

	const pages = [
		{ name: 'Home', href: '/' },
		{ name: 'Transactions', href: '/transactions' },
		{ name: 'Categories', href: '/categories' },
		{ name: 'Accounts', href: '/accounts' },
	]

	const menuItems = [<div>Settings</div>, <div>Sign Out</div>]

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

	const links = pages.map((page, index) => {
		return (
			<Link key={index} href={page.href} passHref>
				<div className={styles.text}>{page.name}</div>
			</Link>
		)
	})

	return (
		<div className={styles.menu}>
			{!signedIn ? (
				<button className={styles.sign_in} onClick={() => signIn()}>
					Sign in
				</button>
			) : (
				<>
					<div className={styles.link_container}>
						<div className={styles.links} ref={linksRef}>
							{links}
						</div>
						<div className={styles.link_underline} ref={linkUnderlineRef} />
					</div>
					<div className={styles.gap} />
					<GreetingMenu session={session} menuItems={menuItems} />
				</>
			)}
		</div>
	)
}
