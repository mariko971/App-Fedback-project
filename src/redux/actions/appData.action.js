import { commentsCount } from "../../components/pages/suggestions-page/suggestions-page-main/suggestion/suggestion.component";

export const sortByLeastVotes = () =>({
    type: 'least votes'
});

export const sortByMostComments = () =>({
    type: 'most comments',
    payload: commentsCount
});

export const sortByLeastComments = () =>({
    type: 'least comments',
    payload: commentsCount
});

export const sortByMostVotes = () =>({
    type: 'most votes'
});

export const addFeedbackAction = (feedback)=>({
    type: 'ADD_FEEDBACK',
    payload: feedback
});
