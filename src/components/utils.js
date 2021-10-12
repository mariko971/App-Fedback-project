import { commentsCount } from "./pages/suggestions-page/suggestions-page-main/suggestion/suggestion.component";

export const filterRequests = (arr,filter)=> arr.filter(item=>item.category.toLowerCase()===filter ? item : null);

export const sortbyData=(sortBy, requestsData)=>{
    switch(sortBy){
        case 'most votes': {
            return requestsData.sort(function(a, b){return b.upvotes - a.upvotes});
        }
        case 'least votes':{
            return requestsData.sort(function(a, b){return (a.upvotes) - b.upvotes});
        }
        case 'most comments': {
            return requestsData.sort(function(a, b){return commentsCount(b.comments) - commentsCount(a.comments)});
        }
        case 'least comments':{
            return requestsData.sort(function(a, b){return commentsCount(a.comments) - commentsCount(b.comments)});
        }
        default: return requestsData;
    }
};


