import { h } from 'preact';
import WeatherItem from './WeatherItem';

export default function WeatherList({ children, cities }) {
	const items = cities.map(c => <WeatherItem city={c} />);
	return (
		<ul className="list-reset">
			{items}
		</ul>
	);
}
