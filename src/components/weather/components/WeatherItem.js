import { h, Component } from 'preact';

const flicker = (li) => {
	if (li == null) { return; }
	li.style.background = '#ffe57d';
	li.style.opacity = '.3';
	setTimeout(() => {
		li.style.background = 'inherit';
		li.style.opacity = '1';
	}, 500);
};

const formattedDate = () => {
	const now = new Date();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const day = days[now.getDay()];
	let hour = now.getHours();
	let part = 'AM';
	if (hour > 12) {
		hour = hour - 12;
		part = 'PM';
	}
	return `${day} ${hour}:00 ${part}`;
}

export default class WeatherItem extends Component {

	componentDidUpdate(oldProps) {
		if (this.props.city.temperature !== oldProps.city.temperature) {
			flicker(this.li);
		}
	}

	render({ children, city }) {
		return (
			<li className="weather-item flex items-center border-b p-4"
				ref={li => this.li = li}>
				<div className="flex justify-between w-full">
					<div className="flex flex-col justify-center">
						<div className="text-grey-dark text-xl font-google capitalize">{city.name}</div>
						<div className="text-grey-dark text-md font-google">{formattedDate()}</div>
						<div className="text-grey-dark text-md font-google">{city.condition}</div>
					</div>
					<div className="flex items-center justify-between w-42">
						<div className="text-black text-3xl font-google">{city.temperature}</div>
						<img src={city.img} alt={city.name} />
					</div>
				</div>
			</li>
		);
	}
}
