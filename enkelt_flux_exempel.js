//quick exampel extracted from this link. If you got qustions, just ask away.
// https://github.com/facebook/flux/tree/master/examples/flux-todomvc/src/data

//-----------------------------
// ActionsTypes
//-----------------------------

'use strict'; // should not be needed i think

const ActionsTypes = {
	LOGEDIN: 'LOGEDIN',
	LOGEDOUT: 'LOGEDOUT'
};

export default ActionsTypes;

//-----------------------------
// Dispatcher
//-----------------------------

import { Dispatcher } from 'flux'; // <--- npm install --save flux

export default new Dispatcher();

//-----------------------------
// Actions
//-----------------------------

import ActionsTypes from './path/to/actiontypes';
import Dispatcher from './path/to/dispatcher';

const Actions = {
	logedIn (bool) {
		Dispatcher.dispatch({
			type: ActionsTypes.LOGEDIN,
			bool // might not need this, we will see.
		});
	},

	logedOut (bool) {
		Dispatcher.dispatch({
			type: ActionsTypes.LOGEDOUT,
			bool // might not need this, we will see.
		)};
	}
};

export default Actions;

//-----------------------------
// Immutable (to make sure your data stays unmutated, basicly that only one instance of the state can excist at any given time or file)
//-----------------------------

import Immutable from 'immutable'; // <---- npm install --save immutable

const login = Immutable.Record({
	logedIn: false
});

export default login;

yawn

import Immutable from 'immutable';
import Actions from './path/to/actions';
import Dispatcher from './path/to/dispatcher';
import { ReduceStore } from 'flux/utils'; // <--- this is what creates the store for you

class LoginStatusStore extends ReduceStore {
	constructor () {
		super(Dispatcher);
	}

	getStatus () {
		return Immutable.OrderedMap();
	}

	reduce (state, action) {
		switch (action.type) {
			case Actions.LOGEDIN:
				return state.update(
					login => login.set('logedIn', !login.logedIn)
				);
			case Actions.LOGEDIN:
				return state.update(
					login => login.set('logedIn', !login.logedIn)
				);
			default:
				return state;
		}
	}
}

export default new LoginStatusStore();

//-----------------------------
// AppContainer (what binds all the actions to where ever we need it....i think, i dont know its twelve o'clock ^^) )
//-----------------------------

import { Container } from 'flux/utils';
import Actions from './path/to/actions';
import Store from './path/to/store';
import App from './path/to/main/app'; //<--- this we can look at together
// import Logout from './path/to/logout/component'; //<--- this needs to be a part of the App, since we can only use three arguments in the createFunctional function. 

function getStores () {
	return [
		Store
	];
}

function getState () {
	return {
		// fetch the store
		status: Store.getStatus(),

		// fetch actions
		onLogin: Actions.logedIn,
		onLogout:Actions.logedOut

	};
}
//Everthing in App now gets the actions above as props. And we can access the store to get the state for loged in or not.
export default Container.createFunctional(App, getStores, getState);

//-----------------------------
// App kind of like i guess (getting quite tired at this point *yawn)
//-----------------------------
//import ?? why? we should have the actions and the store on props! 

//Lets say we have a function like this
function App (props) {
	return (
		<div>
			<Logout {...props} />
			<MainApp {...props} />
		</div>
	);
}

//-----------------------------
// Logout *yawn *yawn
//-----------------------------

//do what ever you do in logout but the actions and store (basicly only need the actions, unidirectional data flow remember!)

//then you can do something like this to access the actions if im not wrong
function logout (props) {
	return (
		<button onClick={props.onLogout}>Fancy Button</button>
	);
}
//this will trigger the action and the store will change its internal immutalbe state to false!!...Yeay

//-----------------------------
// App *yawn *yawn *yawn DAMN triple yawn!
//-----------------------------

//we can reach the value of the store on props here aswell. 
//props.status <-- this will return the value, so do whatever you need to do with it. 
//false will be the default since the user is not loged in from the begining. 
//if the token thingy you had is true then maybe you should change this to true so that the user is not loged in with token but the state is set to false.


//try this, if it dosent work ill give you guys a hand.

//peace!