import React from "react";
import './App.css';


class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
      PointSum: 0
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
"http://localhost:8080/purchases")
			.then((res) => res.json())
			.then((json) => {
        let tempSum = 0;
        for (let key in json) {
          let over100 = Math.max(json[key].cost - 100, 0);
          let over50 = Math.min(50, Math.max(json[key].cost - 50, 0));
          tempSum += over100 * 2 + over50;
        }

				this.setState({
					items: json,
					DataisLoaded: true,
          PointSum: tempSum
				});
			})
	}

	render() {
		const { DataisLoaded, items, PointSum } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Loading </h1> </div> ;

		return (
		<div className = "App">
			<h1> Purchases </h1> {
				items.map((item) => (
				<ol key = { item.id } >
					Date: { item.date },
					Cost: { item.cost },
					</ol>
				))
			}
      <p>Total points: {PointSum}</p>
		</div>
	);
}
}

export default App;
