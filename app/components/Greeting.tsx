import { Session } from 'next-auth'
import styles from './Greeting.module.scss'
import { useEffect, useRef, useState } from 'react'
import MenuIcon from '@/public/menu-hamburger.svg'
import MenuExitIcon from '@/public/exit.svg'

export default function Greeting({ session }: { session: Session }) {
	const [menuOpen, setMenuOpen] = useState<boolean>()
	const menuContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const menuContainerElem = menuContainerRef.current!
		console.log('initial height:', menuContainerElem.offsetHeight)
		if (menuOpen) {
			menuContainerElem.style.transition = 'box-shadow 0.5s ease, background-color 0.5s ease'
			menuContainerElem.style.height = ''
			const offsetHeightAfter = menuContainerElem.offsetHeight
			menuContainerElem.style.height = '0px'
			const delay = setTimeout(() => {
				menuContainerElem.style.transition =
					'box-shadow 0.5s ease, background-color 0.5s ease, height 0.5s ease'
				menuContainerElem.style.height = offsetHeightAfter + 'px'

				clearTimeout(delay)
			}, 10)
		} else {
			menuContainerElem.style.transition =
				'box-shadow 0.5s ease, background-color 0.5s ease, height 0.5s ease'
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
				<div className={styles.menu_row}>example content</div>
				<div className={styles.menu_row}>example content</div>
				<div className={styles.menu_row}>example content</div>
				<div className={styles.menu_row}>example content</div>
			</div>
		</div>
	)
}
