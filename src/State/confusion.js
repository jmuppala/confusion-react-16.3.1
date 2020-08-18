import * as ActionTypes from './ActionTypes';
import { useReducer, useEffect, useRef } from 'react';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

function reducer (state, action) {
    switch(action.type) {

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

    return [state, loading, failed, set];
}

function useThunk(itemType) {

    const [state, loading, failed, set] = useConfusion(itemType);

    const url = baseUrl + itemType;

    const fetchData = () => {

        loading();

        fetch(url)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText + ' ' + response.url);
                throw error;
            }
        },
        error => {
            throw error;
        })
        .then(response => response.json())
        .then(items => set(items))
        .catch(error => failed(error.message));
        
    }

    const addItem = (item) => {
    
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(item),
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
        .then(() => fetchData())
        .catch(error => { console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: '+ error.message); })
    }

    const postFeedback = (feedback) => {
    
        fetch(baseUrl + 'feedback', {
            method: 'POST',
            body: JSON.stringify(feedback),
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
        .then(response =>{ console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
        .catch(error => { console.log('Your feedback could not be posted\nError: ', error.message);
            alert('Your feedback could not be posted\nError: '+ error.message); })
    }

    useEffect(() => {
        fetchData();
    },[])

    return [state, addItem, postFeedback];
}

export const useDishes = () => useThunk('dishes');
export const useComments = () => useThunk('comments');
export const usePromotions = () => useThunk('promotions');
export const useLeaders = () => useThunk('leaders');
