import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

const url = atom({
    key: 'url',
    default: 'http://localhost:3001/'
});

const dishesState = selector({
    key: 'dishesState', // unique ID (with respect to other atoms/selectors)
    get:  async ({get}) => {
        try{
            const fetchUrl=get(url)+ 'dishes';

            const response = await fetch(fetchUrl);

            if (response.ok) {
                const items = await response.json();
                return (items);
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
});

const commentsState = selector({
    key: 'commentsState', // unique ID (with respect to other atoms/selectors)
    get:  async ({get}) => {
        try{
            const fetchUrl=get(url)+ 'comments';

            const response = await fetch(fetchUrl);

            if (response.ok) {
                const items = await response.json();
                return (items);
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
});

const promotionsState = selector({
    key: 'promotionsState', // unique ID (with respect to other atoms/selectors)
    get:  async ({get}) => {
        try{
            const fetchUrl=get(url)+ 'promotions';

            const response = await fetch(fetchUrl);

            if (response.ok) {
                const items = await response.json();
                return (items);
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
});

const leadersState = selector({
    key: 'leaderState', // unique ID (with respect to other atoms/selectors)
    get:  async ({get}) => {
        try{
            const fetchUrl=get(url)+ 'leaders';

            const response = await fetch(fetchUrl);

            if (response.ok) {
                const items = await response.json();
                return (items);
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
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
export const useBaseUrl = () => useRecoilValue(url);
