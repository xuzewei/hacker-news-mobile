import { h, Component } from 'preact'
import TopItems from './top-items'

const API_ORIGIN = 'https://hacker-news.firebaseio.com';

const asJson = r => r.json();

export default class App extends Component {
	state = { items: [] };

	loadItems() {
		fetch(`${API_ORIGIN}/v0/topstories.json`).then(asJson)
			.then( items => Promise.all( items.slice(0, 19).map(
				item => fetch(`${API_ORIGIN}/v0/item/${item}.json`).then(asJson)
			)) )
			.then( items => this.setState({ items }) );
	}

	componentDidMount() {
		this.loadItems();
		if (this.props.autoreload=='true') {
			setInterval(this.loadItems, 4000);
		}
	}

	render({ }, { items }) {
		return (
			<div>
				<TopItems items={items} />
			</div>
		);
	}
}
