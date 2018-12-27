import firebase from 'firebase/app';
import 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';

import { h, Component } from 'preact';
import WeatherList from './components/WeatherList';

export default class App extends Component {
	constructor() {
		super();
		this.state = { cities: [] };
		this.firebaseApp = firebase.initializeApp({
			projectId: "weather-fire"
		});
		const settings = { timestampsInSnapshots: true };
		this.firebaseApp.firestore().settings(settings);
		this.citiesRef = this.firebaseApp.firestore().collection('cities');
	}
	componentDidMount() {
		collectionData(this.citiesRef).subscribe(cities => {
			this.setState({ cities });
		});
	}

	render() {
		return <WeatherList cities={this.state.cities} />;
	}
}
