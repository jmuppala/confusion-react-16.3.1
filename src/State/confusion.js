import * as ActionTypes from './ActionTypes';
import { useReducer, useEffect, useRef } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function reducer (state, action) {
    switch(action.type) {
        case ActionTypes.ADD:
            return state.concat({...action.payload, id: state.length})
        default:
            return state;
    }
}

function useConfusion(initialState) {

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
  
    useEffect(() => {
        const action = actionRef.current;
    
        if (action) {
          console.group('action: ', action.type);
          console.log('Prev State:', oldStateRef.current);
          console.log('Action:', action);
          console.log('Next State:', state);
          console.groupEnd();
        }
    }, [state]);

    return [state, add];
}

export const useDishes = () => useConfusion(DISHES);
export const useComments = () => useConfusion(COMMENTS);
export const usePromotions = () => useConfusion(PROMOTIONS);
export const useLeaders = () => useConfusion(LEADERS);