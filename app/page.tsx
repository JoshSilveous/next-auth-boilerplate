import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'

export default async function Home() {
	const session = await getServerSession()
	return (
		<div>
			Home! getServerSession Result
			{session?.user ? <div>{JSON.stringify(session?.user)}</div> : <div>not logged in</div>}
		</div>
	)
}
