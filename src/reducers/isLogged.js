 const isLogged = (state = {
   
     user : null,

 } , action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                
                user : action.payload,
            } ;

            case 'FAILURE':
            return {
                ...state,
               
                user:null
            } ;

        default:
            return state;
    }
}
export default isLogged;