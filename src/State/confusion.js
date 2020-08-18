import * as ActionTypes from './ActionTypes';
import { useReducer, useEffect, useRef } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

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

    const fetchData = () => {

        loading();

        setTimeout(() => {
            switch (itemType) {
                case 'dishes':
                    set(DISHES);
                    break;
                case 'comments':
                    set(COMMENTS);
                    break;
                case 'promotions':
                    set(PROMOTIONS);
                    break;
                case 'leaders':
                    set(LEADERS);
                    break;
                default:
                    break;
            }
        }, 2000);
        
    }

    useEffect(() => {
        fetchData();
    },[])

    return [state, fetch, add];
}

export const useDishes = () => useThunk('dishes');
export const useComments = () => useThunk('comments');
export const usePromotions = () => useThunk('promotions');
export const useLeaders = () => useThunk('leaders');