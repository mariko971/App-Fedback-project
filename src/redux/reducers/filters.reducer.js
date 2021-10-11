
const suggestionFilter ={
    filter: 'all'
}

const suggestionsFilter = (state = suggestionFilter, action)=>{
    switch(action.type){
        case 'FILTER_SUGGESTIONS':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export default suggestionsFilter;