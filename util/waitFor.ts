/**
 * Async function that delays the execution of following code.
 * @param time delay in milliseconds
 */
export async function waitFor(time: number): Promise<void> {
	return new Promise((res, rej) => {
		const thisTimeout = setTimeout(() => {
			clearTimeout(thisTimeout)
			res()
		}, time)
	})
}
