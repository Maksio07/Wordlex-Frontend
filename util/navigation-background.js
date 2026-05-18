export function setNavigationBg(path) {
	let navigationBg
	if (path === '/') {
		navigationBg = 'bg-transparent'
	} else if (path === '/about-us') {
		navigationBg = 'bg-[#000000f5]'
	} else {
		navigationBg = 'bg-(--navigationBackground)'
	}

	return navigationBg
}
