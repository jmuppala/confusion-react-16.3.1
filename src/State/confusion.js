import { useReducer } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function reducer (state, action) {
    switch(action.type) {
        default:
            return state;
    }
}

function useConfusion(initialState) {

    const [state,dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
}

export const useDishes = () => useConfusion(DISHES);
export const useComments = () => useConfusion(COMMENTS);
export const usePromotions = () => useConfusion(PROMOTIONS);
export const useLeaders = () => useConfusion(LEADERS);