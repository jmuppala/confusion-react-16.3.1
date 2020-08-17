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

export function useConfusion() {
    const initialState = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };

    const [state,dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
}