import bradPittBig from '../public/about-us/team/brad-pitt-big.jpg'
import bradPittSmall from '../public/about-us/team/brad-pitt-small.jpg'
import barackObamaBig from '../public/about-us/team/barack-obama-big.jpg'
import barackObamaSmall from '../public/about-us/team/barack-obama-small.jpg'
import elonBig from '../public/about-us/team/elon-big.jpg'
import elonSmall from '../public/about-us/team/elon-small.jpg'
import portraitBig from '../public/about-us/team/portrait-big.jpg'
import portraitSmall from '../public/about-us/team/portrait-small.jpg'
import womanBig from '../public/about-us/team/woman-big.jpg'
import womanSmall from '../public/about-us/team/woman-small.jpg'
import user1 from '../public/about-us/opinions/user1.jpg'
import user2 from '../public/about-us/opinions/user2.jpg'
import user3 from '../public/about-us/opinions/user3.jpg'
import user4 from '../public/about-us/opinions/user4.jpg'
import user5 from '../public/about-us/opinions/user5.jpg'
import user6 from '../public/about-us/opinions/user6.jpg'

export const team = [
	{
		key: 'Brad Pitt',
		name: 'Brad Pitt',
		position: 'Foundator && CEO',
		description:
			'Dynamiczny lider, który od lat wyznacza nowe stanardy w branży. Dzięki swojemu doświadczeniu, wizji i zaangażowaniu, firma osiągnęła imponujące wyniki, rozwijając się zarówno na rynku krajowym, jak i międzynarodowym.',
		imgBig: bradPittBig,
		imgSmall: bradPittSmall,
	},
	{
		key: 'Elon Musk',
		name: 'Elon Musk',
		position: 'Chef Technology Officer',
		description:
			'Człowiek, który jest odpowiedzialny za kształtowanie i realizację strategii technologicznej w organizacji. Elon odgrywa kluczową rolę w wykorzystaniu technologii do osiągania celów biznesowych oraz budowania przewagi konkurencyjnej.',
		imgBig: elonBig,
		imgSmall: elonSmall,
	},
	{
		key: 'Barack Obama',
		name: 'Barack Obama',
		position: 'Financial Director',
		description:
			'Barack jest kluczowym członkiem kadry zarządzającej, odpowiedzialnym za zarządzanie finansami firmy i wspieranie jej strategii biznesowej poprzez efektywne zarządzanie zasobami finansowymi.',
		imgBig: barackObamaBig,
		imgSmall: barackObamaSmall,
	},
	{
		key: 'Gereon Wolter',
		name: 'Gereon Wolter',
		position: 'Chief Marketing Officer',
		description:
			'Jest naszym liderem odpowiedzialnym za strategię marketingową organizacji i nadzorowanie wszystkich działań związanych z budowaniem marki oraz przyciąganiem klientów. Gereon odgrywa kluczową rolę w zwiększaniu rozpoznawalności firmy i utrzymywaniu pozytywnego wizerunku na rynku.',
		imgBig: portraitBig,
		imgSmall: portraitSmall,
	},
	{
		key: 'Gretta Marchewska',
		name: 'Gretta Marchewska',
		position: 'Chief Graphic Designer',
		description:
			'Gretta jest odpowiedzialna za wizualny aspekt projektów realizowanych przez firmę. Jest kluczową osobą w firmie, ponieważ wpływa bezpośrednio na to, jak marka lub produkt jest odbierany przez klientów.',
		imgBig: womanBig,
		imgSmall: womanSmall,
	},
]

export const opinions = [
	{
		id: 1,
		img: user1,
		userDescription: 'Doświadczony użytkownik',
		alt: 'A brazil man with a ball.',
		title: 'Ernesto Rivaldo',
		opinion: 'Bardzo przydatne i fajne, polecam 👍😁',
	},
	{
		id: 2,
		img: user2,
		userDescription: 'Doświadczony użytkownik',
		alt: 'A man with british flag on his back.',
		title: 'Tomasz Bocian',
		opinion: 'Bardzo fajna aplikacja, dzięki której można w łatwy sposób uczyć się języków.',
	},
	{
		id: 3,
		img: user4,
		userDescription: 'Nowa na platfomie',
		alt: 'A smiling woman.',
		title: 'Elżbieta Baranowska',
		opinion: 'Używam apki tylko 3 dni, a już znam 20 słów w języku hiszpańskim 🧡',
	},
	{
		id: 4,
		img: user3,
		userDescription: 'Bardzo doświadczony użytkownik',
		alt: 'A boy in american football uniform with a ball for american football.',
		title: 'John Wick',
		opinion:
			'Super! Nauczyłem się bardzo dużo słów w języku niemieckim dzięki systematycznemu dodawaniu i powtarzaniu!!!',
	},
	{
		id: 5,
		img: user5,
		userDescription: '3 miesiące na platformie',
		alt: 'A woman sits and thinking with wine.',
		title: 'Katarzyna Polasik',
		opinion: 'Nie wiedziałam, że poświęcając kilka minut dziennie można uczyć się języka 🧡 To naprawdę działa!',
	},
	{
		id: 6,
		img: user6,
		userDescription: '2 lata na platformie',
		alt: 'A horse.',
		title: 'Kajetan Schwarzmann',
		opinion: 'Super aplikacja, bardzo fajnie można powtórzyć sobie różne języki, polecam bardzo!',
	},
]
