import { Session } from 'next-auth'
import styles from './GreetingMenu.module.scss'
import { useEffect, useRef, useState } from 'react'
import MenuIcon from '@/public/menu-hamburger.svg'
import MenuExitIcon from '@/public/exit.svg'
import { waitFor } from '@/util/waitFor'

export default function GreetingMenu({
	session,
	menuItems,
}: {
	session: Session
	menuItems: JSX.Element[]
}) {
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
			className={`${styles.menu_container} ${menuOpen ? styles.expanded : ''}`}
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
