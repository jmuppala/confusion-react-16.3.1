import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

const dishesState = atom({
    key: 'dishesState', // unique ID (with respect to other atoms/selectors)
    default: DISHES // default value (aka initial value)
});

const commentsState = atom({
    key: 'commentsState', // unique ID (with respect to other atoms/selectors)
    default: COMMENTS // default value (aka initial value)
});

const promotionsState = atom({
    key: 'promotionsState', // unique ID (with respect to other atoms/selectors)
    default: PROMOTIONS // default value (aka initial value)
});

const leadersState = atom({
    key: 'leaderState', // unique ID (with respect to other atoms/selectors)
    default: LEADERS // default value (aka initial value)
});

const featuredDishState = selector({
    key: 'featuredDishState',
    get: ({get}) => {
      const dishes = get(dishesState);

      return dishes.filter((dish) => dish.featured)[0];
    }
});

const featuredPromotionState = selector({
    key: 'featuredPromotionState',
    get: ({get}) => {
      const promotions = get(promotionsState);

      return promotions.filter((promotion) => promotion.featured)[0];
    }
});

const featuredLeaderState = selector({
    key: 'featuredLeaderState',
    get: ({get}) => {
      const leaders = get(leadersState);

      return leaders.filter((leader) => leader.featured)[0];
    }
});

export const useDishes = () => useRecoilValue(dishesState);
export const useComments = () => useRecoilValue(commentsState);
export const usePromotions = () => useRecoilValue(promotionsState);
export const useLeaders = () => useRecoilValue(leadersState);
export const useFeaturedDish = () => useRecoilValue(featuredDishState);
export const useFeaturedPromotion = () => useRecoilValue(featuredPromotionState);
export const useFeaturedLeader = () => useRecoilValue(featuredLeaderState);
export function useAddComment() {
    const setComments = useSetRecoilState(commentsState);

    const add = (comment) => {
        setComments((oldcomments) => [ ...oldcomments, {...comment, id: oldcomments.length}]);
    }

    return add;
}
