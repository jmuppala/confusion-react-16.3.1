import * as ActionTypes from './ActionTypes';
import { useReducer, useEffect, useRef } from 'react';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

function reducer (state, action) {
    switch(action.type) {
        case ActionTypes.ADD:
            return {...state, items:state.items.concat({...action.payload, id: state.items.length}) } ;

        case ActionTypes.LOADING:
            return {...state, isLoading: true, errMess: null, items: []};

        case ActionTypes.FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.SET:
            return {...state, isLoading: false, errMess: null, items: action.payload};
            
        default:
            return state;
    }
}

function useConfusion(itemType) {

    const initialState = {
        isLoading: false,
        errMess: null,
        items: []
    };

    const [state,dispatch] = useReducer(reducer, initialState);
    const actionRef = useRef();
    const oldStateRef = useRef();

    const myDispatch = (action) => {
        actionRef.current = action;
        oldStateRef.current = state;
        dispatch(action);
    };

    const add = (item) => myDispatch({
        type: ActionTypes.ADD,
        payload: item
    });
    
    const loading = () => myDispatch({
        type: ActionTypes.LOADING
    });
    
    const failed = (errmess) => myDispatch({
        type: ActionTypes.FAILED,
        payload: errmess
    });
    
    const set = (items) => myDispatch({
        type: ActionTypes.SET,
        payload: items
    });

    useEffect(() => {
        const action = actionRef.current;
    
        if (action) {
          console.group('action: ', itemType, ': ', action.type);
          console.log('Prev State:', oldStateRef.current);
          console.log('Action:', action);
          console.log('Next State:', state);
          console.groupEnd();
        }
    }, [state]);

    return [state, loading, failed, set, add];
}

function useThunk(itemType) {

    const [state, loading, failed, set, add] = useConfusion(itemType);

    const url = baseUrl + itemType;

    const fetchData = () => {

        loading();

        fetch(url)
        .then(response => response.json())
        .then(items => set(items));
        
    }

    useEffect(() => {
        fetchData();
    },[])

    return [state, add];
}

export const useDishes = () => useThunk('dishes');
export const useComments = () => useThunk('comments');
export const usePromotions = () => useThunk('promotions');
export const useLeaders = () => useThunk('leaders');