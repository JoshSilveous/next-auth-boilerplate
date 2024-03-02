import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

export default async function Home() {
	const session = await getServerSession()

	const randomContent: ReactNode[] = []

	for (let i = 0; i < 1000; i++) {
		randomContent.push(<p>Hello! Hello! Hello!</p>)
	}

	return (
		<div>
			Home! getServerSession Result
			{session?.user ? <div>{JSON.stringify(session?.user)}</div> : <div>not logged in</div>}
			{randomContent}
		</div>
	)
}
