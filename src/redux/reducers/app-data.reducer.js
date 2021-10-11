const app_Data = require('../data.json');


const appDataReducer = (state = app_Data, action)=>{
    switch(action.type){
        case 'most votes':{
            return {
                ...state,
                productRequests: [...state.productRequests.sort(function(a, b){return b.upvotes - a.upvotes})]
            }
        }  
        case 'least votes':{
            return {
                ...state,
                productRequests: [...state.productRequests.sort(function(a, b){return a.upvotes - b.upvotes})]
            }
        }  
        case 'most comments':{
            return {
                ...state,
                productRequests: [...state.productRequests.sort(function(a, b){return action.payload(b.comments) - action.payload(a.comments)})]
            }
        }  
        case 'least comments':{
            return {
                ...state,
                productRequests: [...state.productRequests.sort(function(a, b){return action.payload(a.comments) - action.payload(b.comments)})]
            }
        }  
        case 'UPVOTER':{
            const req = state.productRequests.find(request=>request.id===action.payload);
            const reqIndex = state.productRequests.indexOf(req);
            let newproductRequests = [...state.productRequests];
            let tempReq = {...newproductRequests[reqIndex]}
            tempReq.upvotes=tempReq.upvotes+1;
            newproductRequests[reqIndex]=tempReq;
            return{
                ...state,
                productRequests: [...newproductRequests]
            }
        }

        default: return state;
    }
    
}


export default appDataReducer;

