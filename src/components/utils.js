// import { commentsCount } from "./pages/suggestions-page/suggestions-page-main/suggestion/suggestion.component";

export const filterRequests = (arr,filter)=> arr.filter(item=>item.category.toLowerCase()===filter ? item : null);

export const commentsCount = (comments)=>{
    let count = 0;
    if(comments && comments.length>0){
        comments.map((comment)=>
            Object.keys(comment).includes('replies') ?                 
             count = comments.length + comment.replies.length
             : count = comments.length
            );
        return count;
    } else return count;
}

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



export const toggleReply =(reply,func)=>{ if (reply===''){ 
    func('open');
    return reply;
    } else {
        func('');
        return reply;
    }
};

export const newComments = (reply,productRequests,commentID,requestID)=>{
    const suggestionReqIndex = productRequests.findIndex(req=>req.id===parseInt(requestID));
    const suggestionReq = productRequests[suggestionReqIndex];
    const commIndex = suggestionReq.comments.findIndex(com=>com.id===commentID);
    const seqComments = [...suggestionReq.comments];
    const seqComment = seqComments[commIndex];
    console.log(commIndex)
    const seqCommentReps = seqComment.replies ? [...seqComment.replies, reply]
        : 
        [reply];
        seqComment.replies =seqCommentReps;
        seqComments[commIndex] =seqComment;
    return seqComments;
};

export function validateInfo(values){
    let errors ={};
    if(!values.title.trim()){
       errors.title = `Can't be empty`
    } 
    if(!values.description.trim()){
       errors.description = `Can't be empty`
    } 
    if(!values.category.trim()){
       errors.category = `Select a category`
    } 
    return errors;
}


