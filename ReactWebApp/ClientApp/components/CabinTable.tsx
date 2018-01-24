import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import * as React from 'react';

//interface IFilterProps
//{
//    cabin: CabinStore;
//}

class CabinStore
{
    static insts: CabinStore[];

    @observable smallArray: string[];
    @observable loading: boolean;
    @observable text: string;
    @observable show: boolean;
    @observable inputText: string;
    constructor()
    {
       
        if (!CabinStore.insts) {
            CabinStore.insts = [];
        }
        
        this.inputText = "";
        this.loading = true;
        this.show = false;
        this.smallArray = ["Vitya", "Vasia"];
        CabinStore.insts.push(this);
    }
    @computed get allCount(): number
    {
        let count: number = 0;
        CabinStore.insts.forEach(item => count += item.count);
        return count;
    }
    @computed get result(): number
    {
        console.log(CabinStore.insts.length);
        let result: number = 0;
        CabinStore.insts.forEach(item => {
            let n = parseInt(item.inputText);
            if (n)
            {
                n = 0;
            }
            result += n;
            console.log(n);
        });
        return result;
    }
    @computed get count():number
    {
        return this.inputText.length;
    }
    @action
    addText(text: string)
    {
        this.text = text;
    }
    @action
    enterText(text: string)
    {
        this.inputText = text;
    }
    @action
    changeShow()
    {
        this.show = !this.show;
    }

    @action
    add(element: string)
    {
        this.smallArray.push(element);
    }
    @action
    clear()
    {
        CabinStore.insts = [];
    }

}
export const cabin = new CabinStore();




@observer
export class CabinTable extends React.Component<{}, {}>
{
    private cabins: CabinStore;
    constructor()
    {
        super();
        this.cabins = new CabinStore();
    }
    render()
    {
        let content = this.cabins.show ? <em>Loading</em> : this.renderSelect();
        return (<div>
            <div>{this.cabins.result}</div>
            <div>COUNT CHAR = {this.cabins.count}</div>
            <div>All CHAR = {this.cabins.allCount}</div>
            <input type="text" className="" value={this.cabins.inputText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.cabins.enterText(e.target.value)} />
            {content}
            <button className="btn btn-lg btn-primary" onClick={()=>this.cabins.changeShow()}>Simple Button</button>
            </div>);
    }
    renderSelect(): JSX.Element
    {
        return <div>LLLLLLLL--->></div>;
    }
    componentWillUnmount() {
        cabin.clear();
    }
}
