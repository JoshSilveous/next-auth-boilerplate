import { useEffect, useRef, useState } from 'react'
import styles from './NavBarMobile.module.scss'
import MenuIcon from '@/public/menu-hamburger.svg'
import { NavBarData } from './NavBar'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBarMobile({
	navBarData,
	session,
}: {
	navBarData: NavBarData
	session: Session | null
}) {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = '/' + usePathname().split('/')[1]
	const menuContainerRef = useRef<HTMLDivElement>(null)
	const signedIn = session !== null

	let animDelay = 0
	const links = navBarData.pages.map((page, index) => {
		animDelay += 0.1
		return (
			<Link key={index} href={page.href} passHref>
				<div
					className={`${styles.link} ${pathname === page.href ? styles.current : ''}`}
					onClick={() => setMenuOpen(false)}
					style={{ transitionDelay: animDelay + 's' }}
				>
					{page.name}
				</div>
			</Link>
		)
	})

	const accountOptions = navBarData.accountOptions.map((accountOption, index) => {
		animDelay += 0.1
		return (
			<Link key={index} href={accountOption.href} passHref>
				<div
					className={styles.link}
					onClick={() => setMenuOpen(false)}
					style={{ transitionDelay: animDelay + 's' }}
				>
					{accountOption.name}
				</div>
			</Link>
		)
	})

	useEffect(() => {
		const maxHeight = window.innerHeight
		const menuContainerNode = menuContainerRef.current!

		if (menuOpen) {
			menuContainerNode.style.height = maxHeight + 'px'
		} else {
			menuContainerNode.style.height = ''
		}
	}, [menuOpen])
	return (
		<div className={`${styles.content} ${menuOpen ? styles.open : ''}`} ref={menuContainerRef}>
			<div className={styles.top_row}>
				<div className={styles.logo_container}>My Logo</div>

				<div className={styles.menu_icon} onClick={() => setMenuOpen((prev) => !prev)}>
					<MenuIcon />
				</div>
			</div>
			<div className={styles.expanded_content}>
				{signedIn ? (
					<>
						<div className={styles.greeting}>Hi, {session.user!.name}!</div>
						<div className={styles.link_container}>{links}</div>
						<div className={styles.account_options_container}>{accountOptions}</div>
					</>
				) : (
					<button className={styles.sign_in} onClick={() => signIn()}>
						Sign in
					</button>
				)}
			</div>
		</div>
	)
}
