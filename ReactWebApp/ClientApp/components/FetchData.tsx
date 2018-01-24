import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { observable,computed} from 'mobx';


interface FetchDataExampleState {
    forecasts: WeatherForecast[];
    simples: Simple[];
    loading: boolean;
}
interface Simple
{
    id: string;
    name: string;
}

class Simple
{
//get promise
    GetPromise()
    {

    }
}


//class ListStore {
//    @observable list = [
//        'Hello World!',
//        'Hello React Native!',
//        'Hello MobX!'
//    ];

//    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

//    @computed get dataSource() {
//        return this.ds.cloneWithRows(this.list.slice());
//    }
//}

//const listStore = new ListStore();

//@observer class List extends Component {
//    render() {
//        return (
//            <ListView
//                dataSource={listStore.dataSource}
//                renderRow={row => <Text>{row}</Text>}
//                enableEmptySections={true}
//            />
//        );
//    }
//}



class Filters
{
    @observable name: string;
    @observable id: string;
    @observable some: string;
}

export class NewComponent extends React.Component<Filters, {}>
{
    @computed
    get Name():string
    {
        return this.props.name;
    }
    @computed
    get Id(): string
    {
        return this.props.id;
    }
    @computed
    get Some(): string
    {
        return this.props.some;
    }

    render()
    {
        return <div>Hello</div>
    }
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], simples:[], loading: true };
        let promise = fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data});
            });

        let promise2 = fetch('api/SampleData/Simp').then(this.accept, this.reject)//response => response.json() as Promise<Simple[]>);
        Promise.all([promise, promise2]).then(response => {
            console.log(response);
            this.setState({loading:false});
        });
        //Promise.aadadslkdfls
    }
    accept(response: Response)
    {
        let data = response.json() as Promise<Simple[]>
       
        //this.setState({ simples: data });
        console.log(data);
    }
    reject(resoans: any)
    {
        console.log(resoans);

    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private  renderForecastsTable(forecasts: WeatherForecast[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
            {forecasts.map(forecast =>
                <tr key={ forecast.dateFormatted }>
                    <td>{ forecast.dateFormatted }</td>
                    <td>{ forecast.temperatureC }</td>
                    <td>{ forecast.temperatureF }</td>
                    <td>{ forecast.summary }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
