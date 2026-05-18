'use client'

import { team } from '../../data/about-us-data'
import Image from 'next/image'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './about-us-team.module.css'

export default function AboutUsTeam() {
	const { width } = useWindowSize()

	return (
		<div className='flex flex-col justify-center'>
			<h2 className={styles.title + ' text-(--title) text-center text-6xl font-bold'}>Nasz Zespół</h2>
			<div className={styles.container + ' flex flex-wrap justify-center'}>
				{team.map(member => {
					return (
						<div
							key={member.key}
							className={
								styles.box + ' w-xl h-250 bg-(--aboutUsCardBg) rounded-[.8rem] max-[375px]:h-260 max-[300px]:h-275'
							}>
							<Image
								src={width < 650 ? member.imgSmall : member.imgBig}
								alt={member.name}
								className={styles.img + ' w-full h-152'}
								loading='eager'
							/>
							<h3 className={styles.member__title + ' text-center text-[2.2rem] font-medium text-(--title)'}>
								{member.name}
							</h3>
							<p className={styles.member__position + ' text-center text-[1.8rem] font-medium text-(--title)'}>
								{member.position}
							</p>
							<span className={styles.line + ' block h-[.1rem] w-full'}></span>
							<p className={styles.member__description + ' text-[1.4rem] text-center text-pretty text-(--title)'}>
								{member.description}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
