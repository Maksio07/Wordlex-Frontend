import Link from 'next/link'
import ActionBtn from '../UI/ActionBtn'
import styles from './topics.module.css'

export default function TopicItem({ topics, languageId, onDeleteTopic, onHandleEditModal, topicWords }) {
	return (
		<>
			{topics &&
				topics.map(topic => {
					const topicNavigationId = languageId + '-' + topic.topic_name.toLowerCase().replace(/\s+/g, '-')
					const amountOfWords = topicWords.filter(word => word.topic_id === topic.id)
					return (
						<li
							key={topic.id}
							id={topicNavigationId}
							datatype={topic.language_id}
							className={`${styles.topic} relative flex flex-col justify-center w-100 h-48 rounded-[.6rem] cursor-pointer bg-(--navigationBackground) max-[320px]:w-88`}>
							<ActionBtn remove={true} onClick={onDeleteTopic} />
							<ActionBtn edit={true} onClick={() => onHandleEditModal(topic)} />
							<Link href={`/profile/${topic.user_id}/${languageId}/${topicNavigationId}`}>
								<div className='flex justify-evenly items-center flex-wrap'>
									<p className={`${styles.topic_text}`}>{topic.topic_name}</p>
									<span className={`${styles.topic_text}`}>-</span>
									<p className={`${styles.name_in_polish} ${styles.topic_text}`}>{topic.topic_polish_name}</p>
								</div>
								<p className={`${styles.words__amount} text-center text-[1.6rem] font-normal text-(--links)`}>
									Ilość dodanych słów: {amountOfWords.length}
								</p>
							</Link>
						</li>
					)
				})}
		</>
	)
}
