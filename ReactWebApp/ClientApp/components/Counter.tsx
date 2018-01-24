import { todostore, IToDoStore } from "./stores/basestore";
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';




interface IState
{
    id: string;
    name: string;
    selected: string;
    list: Info[];
    count: number;
    listloaded: boolean;
}
interface IStoreState {
    id: string;
    name: string;
    selected: string;
    count: number;
}

export class Counter extends React.Component<RouteComponentProps<{}>, IState>
{
    //@observable item: string;
    private list: Info[];
    constructor() {
        console.log("constructor");
        todostore.filter = "hello";
        super();
        let selectedItem = window.localStorage["selected_item"];
        //if (selectedItem)
        //{
        //    console.log("Hello aim local storage");
        //}
        if (window.localStorage["crew_state"]) {
            let storeState = JSON.parse(window.localStorage["crew_state"]) as IStoreState;

            this.state = {
                id: storeState.id,
                name: storeState.name,
                selected: storeState.selected,
                list: [],
                count: storeState.count,
                listloaded:false
            };
        }
        else
        {
            this.state = { id: "", name: "", selected: selectedItem, list: [], count: 5, listloaded: false};
            let storeItem = this.state as IStoreState;
            console.log(storeItem);
            window.localStorage["crew_state"] = JSON.stringify(storeItem);
        }
        console.log(this.state)
        this.changing = this.changing.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.GetInfoList(this.state.count);
        
    }
    GetTuple():[string,string][]
    {
        let tuple: [string, string][] = [["dajsdfhafkjahsfkj", "Ivan"],
                    ["dajsdfhafkjakadljskldhas", "Dima"]];
        return tuple;
    }
    GetInfoList(count: number)
    {
        let data: string = "count=" + count;
        fetch('api/SampleData/CrewTable', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: data
        })
            .then(response => response.json() as Promise<Info[]>)
            .then(data => {
                this.list = data;
                this.listChange();
            });
    }


    componentWillMount() {
    }


    public render() {
        console.log("Counter - render");
        let contents = !this.state.listloaded
            ? <p><em>Loading...</em></p>
            : <CrewTable list={this.list} />
        return (<div>
            <input type="email" className="form-control" id="exampleInputEmail1"  onChange={this.inputChange} aria-describedby="emailHelp" placeholder="Enter email" />
            <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.name} onChange={this.changing} aria-describedby="emailHelp" placeholder="Enter email" />
            <span>{this.state.selected}</span>
            <Select className="form-control" options={this.GetTuple()} />
            <BootstrapInput name={this.state.name} />
            <TodoList/>
            {contents}
        </div>);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        todostore.filter = e.target.value;
    }
    listChange()
    {
        this.setState({ listloaded: true });
    }
    changing(e: React.ChangeEvent<HTMLInputElement>)
    {
        let itemCount = e.target.value;
        let numeric = parseInt(itemCount);
        this.setState({ name: itemCount, count: numeric});
        if (numeric !== NaN)
        {
            this.GetInfoList(numeric);
        }
        
    }
    componentDidMount()
    {
        console.log("componentDidMount");
    }
    componentWillUnmount()
    {
        window.localStorage["crew_state"] = JSON.stringify(this.state as IStoreState);
        alert("WillUnmount");
        console.log("componentWillUnmount - that component will be delete");
    }
    //shouldComponentUpdate(nextProps: RouteComponentProps<{}>, nextState:IState): boolean
    //{
    //   // return .shouldComponentUpdate(nextProps, nextState);
    //    return true;
    //}
    componentWillUpdate(nextProps: RouteComponentProps<{}>, nextState: IState)
    {
        //console.log("componentWillUpdate - вызывается перед обновлением компонента (если shouldComponentUpdate возвращает true)");
    }
    componentDidUpdate(prevProps: RouteComponentProps<{}>, prevState: IState)
    {
        console.log("componentDidUpdate");
    }

}

@observer
export class TodoList extends React.Component<{}, {}>
{
    constructor()
    {
        super();
    }
    render()
    {
        console.log("TodoListRender");
        return (<div>
            <h1>{todostore.filter}</h1>
            {todostore.todos.map(td => 
                <h1>{td}</h1>
            )};
            
            </div>);
    }
}


interface IInputState
{
    text: string;
}
interface IInputProps
{
    name: string;
}
export class BootstrapInput extends React.Component<IInputProps, IInputState>
{
    constructor()
    {
        super();
        this.state = { text: "" };
        this.changing = this.changing.bind(this);
    }
    public render() {
        return (<div className="form-group">
                    <label htmlFor="exampleInputEmail1">{this.props.name}</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.text} onChange={this.changing} aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>);
    }
    changing(e: React.ChangeEvent<HTMLInputElement>)
    {
        window.localStorage["selected_item"] = e.target.value;
        this.setState({ text: e.target.value });
        
    }
    componentWillUpdate(nextProps: IInputProps, nextState: IInputState)
    {
       // this.
    }
}

interface Info
{
    id: string;
    name: string;
    description: string;
}

interface ICrewTableProps
{
    list: Info[];
}

interface ICrewTableState
{
    onLoaded: boolean;
}

interface ISelectProps
{
    className: string;
    options: [string,string][];
}
class Select extends React.Component<ISelectProps, {}>
{
    render()
    {
        return (<select className={this.props.className}>
            {this.props.options.map(option =>
                <option key={option[0]} value={option[0]}>{option[1]}</option>
            )};
                </select>);
    }

}

class CrewTable extends React.Component<ICrewTableProps, ICrewTableState>
{
    constructor()
    {
        super();
        this.state = { onLoaded: true };
    }
    render()
    {
        return (<table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {this.props.list.map(info =>
                    <tr key={info.id}>
                        <td>{info.name}</td>
                        <td>{info.description}</td>
                    </tr>
                )}
            </tbody>
        </table>);
    }
}




//interface CounterState {
//    currentCount: number;
//}

//export class Counter extends React.Component<RouteComponentProps<{}>, CounterState> {
//    constructor() {
//        super();
//        this.state = { currentCount: 0 };
//    }

//    public render() {
//        return <div>
//            <h1>Counter</h1>

//            <p>This is a simple example of a React component.</p>

//            <p>Current count: <strong>{ this.state.currentCount }</strong></p>

//            <button onClick={ () => { this.incrementCounter() } }>Increment</button>
//        </div>;
//    }

//    incrementCounter() {
//        this.setState({
//            currentCount: this.state.currentCount + 1
//        });
//    }
//}
