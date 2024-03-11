'use client'
import { useSession } from 'next-auth/react'
import styles from './NavBar.module.scss'
import NavBarDesktop from './NavBarDesktop'
import NavBarMobile from './NavBarMobile'

export interface NavBarData {
	pages: { name: string; href: string }[]
	accountOptions: { name: string; href: string }[]
}

export default function NavBar({ navBarData }: { navBarData: NavBarData }) {
	const { data: session } = useSession()
	return (
		<div className={styles.navbar}>
			<div className={styles.mobile}>
				<NavBarMobile navBarData={navBarData} session={session} />
			</div>
			<div className={styles.desktop}>
				<NavBarDesktop navBarData={navBarData} session={session} />
			</div>
		</div>
	)
}
