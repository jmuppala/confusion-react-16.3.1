import { atom, useRecoilValue } from 'recoil';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const State = [];

State['dishes'] = atom({
    key: 'dishesState', // unique ID (with respect to other atoms/selectors)
    default: DISHES // default value (aka initial value)
});

State['comments'] = atom({
    key: 'commentsState', // unique ID (with respect to other atoms/selectors)
    default: COMMENTS // default value (aka initial value)
});

State['promotions'] = atom({
    key: 'promotionsState', // unique ID (with respect to other atoms/selectors)
    default: PROMOTIONS // default value (aka initial value)
});

State['leaders'] = atom({
    key: 'leaderState', // unique ID (with respect to other atoms/selectors)
    default: LEADERS // default value (aka initial value)
});

function useConfusion(itemType) {
    const itemState = useRecoilValue(State[itemType]);

    return itemState;
}

export const useDishes = () => useConfusion('dishes');
export const useComments = () => useConfusion('comments');
export const usePromotions = () => useConfusion('promotions');
export const useLeaders = () => useConfusion('leaders');