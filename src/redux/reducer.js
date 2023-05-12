import { ADD_FAV, FILTER, REMOVE_FAV,ORDER} from "./actions-types"
 
const initialState = {
    myFavorites: [],
    allCharacter: []
   
}

const reducer = (state = initialState, action) => {
    switch ( action.type) {
        case ADD_FAV:
        let copyAllCharacter = [...state.allCharacter, action.payload]

            return {
                ...state,
              myFavorites: copyAllCharacter,
              allCharacter: [...copyAllCharacter]
            }

            case FILTER:
               let copyFilter = state.allCharacter.filter((character) => character.gender === action.payload)

               return {
                ...state,
                myFavorites: copyFilter
               }
            
            case ORDER:
               const orderCharacter = state.allCharacter.sort((a, b) => {
                if(action.payload === "A"){
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
               let deleteCharacter = state.myFavorites.filter(character => character.id !== Number(action.payload))
              return {
                ...state,
                myFavorites: deleteCharacter
             }


          default:
            return {
                ...state
            }



     
    }











}

export default reducer