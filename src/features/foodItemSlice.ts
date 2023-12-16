import { GenericState, createGenericSlice } from '../app/store/genericSlice'
import { FoodItem } from '../app/types/foodItem'

type State = {
    data: FoodItem[]
}

const initialState: State = {
    data: []
}

export const foodItemSlice = createGenericSlice({
    name: 'foodItems',
    initialState: initialState as GenericState<FoodItem[]>,
    reducers: {}
})

export const actions = foodItemSlice.actions;