import { ADD_FAV, FILTER, REMOVE_FAV,ORDER} from "./actions-types"
 
const initialState = {
    myFavorites: [],
    allCharactersFav: []
   
}

const reducer = (state = initialState, {type, payload}) => {
    switch ( type) {
        case ADD_FAV:
            return {
                ...state,
              myFavorites: payload,
              allCharactersFav: payload
            }

            case FILTER:
                const allCharactersFiltered = state.allCharactersFav.filter(allCharactersFiltered)
               return {
                ...state,
                myFavorites: 
                  payload === 'allcharacters'
                  ? [...state.allCharactersFav]
                  : allCharactersFiltered
               }
            
            case ORDER:
               const orderCharacter = state.allCharactersFav.sort((a, b) => {
                if(payload === "A"){
                   // if(a.id < b.id) return -1;
                   // if(b.id < a.id) return 1
                    return a.id - b.id
                    
                }
                // DESCENDENTE
                else {
                   //if(a.id < b.id) return 1
                   //if(b.i < a.id) return - 1
                   return b.id - a.id
                }
            
            })
          console.log("caso order", orderCharacter);
        return {
            ...state,
            myFavorites: [...orderCharacter]
        }


            case REMOVE_FAV:
              return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload
             
             }


          default:
            return {
                ...state
            }



     
    }











}

export default reducer