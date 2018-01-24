import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

class Filter {
    @observable selectedText: string;
    @observable selectedPersons: string[];
    @observable search: string;
}
class Ticker {
    @observable tick: number = 0;
    @observable str: string;

   // @action.bound


    @action.bound
    increment() {
        this.tick++; // 'this' will always be correct
    }
}

const ticker = new Ticker()
@observer
export class TimerTick extends React.Component<{}, {}>
{
    constructor()
    {
        super();
        //const { tick } = this.props;
        setInterval(ticker.increment, 1000);
    }
    render()
    {
        console.log("render");
        return (<div>{ticker.tick}</div>);
    }
}