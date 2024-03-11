'use client'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import styles from './NavBarDesktop.module.scss'
import { useEffect, useRef, useState } from 'react'
import MenuIcon from '@/public/menu-hamburger.svg'
import MenuExitIcon from '@/public/exit.svg'
import { waitFor } from '@/util/waitFor'
import { NavBarData } from './NavBar'

export default function NavBarDesktop({
	navBarData,
	session,
}: {
	navBarData: NavBarData
	session: Session | null
}) {
	const pathname = '/' + usePathname().split('/')[1]
	const linksRef = useRef<HTMLDivElement>(null)
	const linkUnderlineRef = useRef<HTMLDivElement>(null)
	const signedIn = session !== null

	useEffect(() => {
		const linksElemArray = linksRef.current!.childNodes as NodeListOf<HTMLDivElement>
		const linkUnderlineElem = linkUnderlineRef.current!

		const currentPageIndex = navBarData.pages.findIndex((page) => page.href === pathname)

		if (currentPageIndex !== -1) {
			const currentLinkElem = linksElemArray[currentPageIndex]

			linkUnderlineElem.style.width = `${currentLinkElem.offsetWidth}px`
			linkUnderlineElem.style.left = `${currentLinkElem.offsetLeft}px`
		} else {
			linkUnderlineElem.style.width = '0px'
			linkUnderlineElem.style.left = '0px'
		}
	}, [pathname])

	const links = navBarData.pages.map((page, index) => {
		return (
			<Link key={index} href={page.href} passHref>
				<div className={styles.text}>{page.name}</div>
			</Link>
		)
	})
	const menuItems = navBarData.accountOptions.map((accountOption, index) => {
		return (
			<Link key={index} href={accountOption.href} passHref>
				<div>{accountOption.name}</div>
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

function GreetingMenu({ session, menuItems }: { session: Session; menuItems: JSX.Element[] }) {
	const [menuOpen, setMenuOpen] = useState<boolean>()
	const menuContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const TRANSITION_TIME = 0.5
		const menuContainerElem = menuContainerRef.current!
		function handleClickWhileMenuOpen(e: MouseEvent) {
			if (!menuContainerElem.contains(e.target as any)) {
				window.removeEventListener('click', handleClickWhileMenuOpen)
				setMenuOpen(false)
			}
		}
		if (menuOpen) {
			menuContainerElem.style.transition = `box-shadow ${TRANSITION_TIME}s ease, background-color ${TRANSITION_TIME}s ease`
			menuContainerElem.style.height = ''

			const offsetHeightAfter = menuContainerElem.offsetHeight
			menuContainerElem.style.height = '0px'

			waitFor(10).then(() => {
				menuContainerElem.style.transition = `box-shadow ${TRANSITION_TIME}s ease, background-color ${TRANSITION_TIME}s ease, height ${TRANSITION_TIME}s ease`
				menuContainerElem.style.height = offsetHeightAfter + 'px'

				window.addEventListener('click', handleClickWhileMenuOpen)
			})
		} else {
			window.removeEventListener('click', handleClickWhileMenuOpen)

			menuContainerElem.style.transition = `box-shadow ${TRANSITION_TIME}s ease, background-color ${TRANSITION_TIME}s ease, height ${TRANSITION_TIME}s ease`
			menuContainerElem.style.height = '25px'
		}
	}, [menuOpen])

	return (
		<div
			className={`${styles.greeting_menu_container} ${menuOpen ? styles.expanded : ''}`}
			ref={menuContainerRef}
		>
			<div className={styles.greeting_container} onClick={() => setMenuOpen((prev) => !prev)}>
				<div className={styles.greeting}>Hi, {session.user?.name}!</div>
				<div className={styles.menu_icon_container}>
					<div className={styles.exit}>
						<MenuExitIcon />
					</div>
					<div className={styles.hamburger}>
						<MenuIcon />
					</div>
				</div>
			</div>
			<div className={styles.menu_content}>
				{menuItems.map((menuItem, index) => {
					return (
						<div className={styles.menu_row} key={index}>
							{menuItem}
						</div>
					)
				})}
			</div>
		</div>
	)
}
