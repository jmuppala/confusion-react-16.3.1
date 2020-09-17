import { atom, selector, useRecoilValue, useResetRecoilState, DefaultValue } from 'recoil';

const url = atom({
    key: 'url',
    default: 'http://localhost:3001/'
});

const forceCommentsUpdate = atom({
    key: 'forceCommentsUpdate',
    default: 0,
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
        get(forceCommentsUpdate);
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
    },
    set: ({ set }, value) => {
      if (value instanceof DefaultValue) {
        set(forceCommentsUpdate, v => v + 1);
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
    const resetComments = useResetRecoilState(commentsState);

    const UrlValue = useRecoilValue(url);

    const fetchUrl = UrlValue + 'comments';

    const add = (comment) => {

        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                error.response = response;
                throw error;
            }
        },
        error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => console.log('Posted: ', response))
        .then(() => resetComments())
        .catch(error => { console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: '+ error.message); });
    }

    return add;
}
export const useBaseUrl = () => useRecoilValue(url);
