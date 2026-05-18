import Image from 'next/image'
import Link from 'next/link'
import ActionBtn from '../UI/ActionBtn'
import styles from './words.module.css'

export default function WordItem({ words, topicData, onDelete, onOpenEditModal }) {
	return (
		<>
			{words &&
				words.map(word => {
					let listStyles

					if (word.word_img_path) {
						listStyles = ' flex flex-col items-center flex-wrap'
					} else {
						listStyles =
							' flex flex-col items-center flex-wrap justify-center w-[30rem] max-[390px]:w-[22rem] max-[325px]:w-[18rem]'
					}

					return (
						<li
							id={word.word_id}
							key={word.id}
							className={`${styles.word} relative flex items-center w-lg h-42 rounded-[.8rem] cursor-pointer bg-(--navigationBackground) max-[390px]:w-104 max-[325px]:w-90`}>
							<ActionBtn remove={true} onClick={onDelete} />
							<ActionBtn edit={true} onClick={() => onOpenEditModal(word)} />
							<Link
								href={`/profile/${word.user_id}/${topicData.languageId}/${topicData.topicId}/${word.word_id}`}
								className={` flex items-center`}>
								{word.word_img_path && (
									<Image
										src={word.word_img_path}
										width={40}
										height={40}
										alt={`Obrazek pokazujący ${word.word_name}.`}
										className={`${styles.img} h-42 w-40`}
										unoptimized
									/>
								)}

								<div className={`${styles.text_box} ${listStyles}`}>
									<p className={`${styles.name} text-[1.8rem] font-medium text-(--links) max-[325px]:text[1.6rem]`}>
										{word.word_name}
									</p>
									<p
										className={`${styles.name_in_polish} text-[1.6rem] font-normal text-(--links) max-[325px]:text[1.4rem]`}>
										{word.word_polish_name}
									</p>
								</div>
							</Link>
						</li>
					)
				})}
		</>
	)
}
