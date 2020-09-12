import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { atom, useRecoilValue } from 'recoil';

const confusionState = atom({
    key: 'confusionState', // unique ID (with respect to other atoms/selectors)
    default: {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    }, // default value (aka initial value)
});

export function useConfusion() {
    const state = useRecoilValue(confusionState);

    return state;
}