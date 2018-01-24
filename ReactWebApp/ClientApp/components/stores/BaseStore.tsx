
import { observable, computed, action, autorun } from 'mobx';
//import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IToDoStore
{
    todos: string[];
    filter: string;
}


class ToDoStore implements IToDoStore {
    @observable todos: string[] = ["buy milk", "buy eggs"];
    @observable filter: string = "";
}

export const todostore  = new ToDoStore();

autorun(() => {

    console.log(todostore.filter);
    console.log(todostore.todos[0]);
});

//import 'isomorphic-fetch';
//enum SendMethod
//{
//    post,
//    get,
//    delete,
//    put
//}
//class AppSettings
//{
//    //public static Urls:
//}

//export class StoresFactory
//{
//     public playerStore(): PlayerStore
//     {
//        return new PlayerStore();
//     }
//}

//interface Player
//{
//    id: string;
//    name: string;
//}


//class PlayerStore
//{
//    public list(func:() => string ): string
//    {
//        return func();
//    }
//    //public list(function: Function): Player[]
//    //{
//    //    fetch(AppSettings.Urls,)
//    //}
//}

//abstract class BaseStore
//{
//    public list():any
//    {
        
//    }
//    public item(): any
//    {

//    }
//    public remove(): any
//    {

//    }
//    public update(): any
//    {

//    }
//} 