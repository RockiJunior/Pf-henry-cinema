
import {
    ADD_TO_CART,
    CLEAR_CART,
    GET_ALL,
    CINEMAS,
    SCREENING,
    SEATS,
    INCREMENT_CART,
    DECREMENT_CART,
    POST_FILL_CART,
    STORAGE,

} from './cartsActions';

export const initialState = {
    cart: [],
    movies: [],
    storage:[],
    cinemas: [{
            name: "Kaia",
            id: 1,
            location: "32105 Lulu Ways"
        },
        {
            name: "Leta",
            id: 2,
            location: "05061 Greenholt Underpass"
        },
        {
            name: "Clark",
            id: 3,
            location: "0352 Upton Estates"
        },
    ],
    cinemaSelect: [],
    screening: [{
            time: 20,
            id: 1
        },
        {
            time: 22,
            id: 2
        },
        {
            time: 24,
            id: 3
        }
    ],
    screeningSelect: [],
    seats: [{
            row: "A",
            number: 1,
            id: 1,
        },
        {
            row: "A",
            number: 2,
            id: 2,
        },
        {
            row: "A",
            number: 3,
            id: 3,
        },
    ],
    seatsSelect: [],
    postCart: []
};

function cartReducer(state = initialState, action) {



    switch (action.type) {
        case GET_ALL:
            {
                return {
                    ...state,
                    movies: action.movies,

                }
            }

        case ADD_TO_CART:

            let newItem = state.movies.find((movie) => movie.id == action.payload);
            let iteminCart = state.cart.find((item) => item.id == newItem.id)
            let movieId = newItem? newItem.id: null
            return iteminCart ? {
                ...state,
                cart: state.cart.map((item) => item.id == newItem.id ? {...item, quantity: item.quantity + 1 } : item),
                postCart: [...state.postCart, { movieId }]
            } : {
                ...state,
                cart: [{...newItem, quantity: 1 }],
                postCart: [{ movieId }]
            }
            case STORAGE:
                let estado= state.cart
                    window.localStorage.setItem("id",JSON.stringify( estado))
                    let store2=JSON.parse(window.localStorage.getItem("id"))
                return{
                    ...state,
                    storage: store2
                }

        case POST_FILL_CART:
            return {
                ...state
            }

        case CLEAR_CART:
            {
                return {
                    ...state,
                    cart: []
                }
            }
        case CINEMAS:
            {
                let cinePrueba = state.postCart.length === 1 ? [{...state.postCart[0], cinemaId: action.payload }] : state.postCart.map(item => item.cinemaId ? { item } : {...item, cinemaId: action.payload })
                return {
                    ...state,
                    cinemaSelect: action.payload,
                    postCart: cinePrueba
                }
            }
        case SCREENING:
            {
                let screeningPrueba = state.postCart.length === 1 ? [{...state.postCart[0], screeningId: action.payload }] : state.postCart.map(item => item.screeningId ? {...item } : {...item, screeningId: action.payload })
                return {
                    ...state,
                    screeningSelect: action.payload,
                    postCart: screeningPrueba
                }
            }
        case SEATS:
            {
                var flag = true;
                let seatSelect = state.postCart.map(item => {

                    while (flag && !item.seat) {
                        item.seat = action.payload;
                        flag = false
                    }
                    return item
                })
                return {
                    ...state,
                    seatsSelect: [...state.seatsSelect, action.payload],
                    postCart: seatSelect
                }
            }
        case INCREMENT_CART:
            {
                let result = state.cart.map(item => item ? {...item, quantity: item.quantity + 1 } :
                    item)

                return {
                    ...state,
                    cart: result,
    
                }
            }
        case DECREMENT_CART:
            {
                let result = state.cart.map(item => item ? {...item, quantity: item.quantity - 1 } :
                    item)
                return {
                    ...state,
                    cart: result
                }
            }
        default:
            return state

    }

}

export default cartReducer;