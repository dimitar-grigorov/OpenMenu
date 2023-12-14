import { GenericState, createGenericSlice } from '../../app/store/genericSlice'
import { Category } from '../../app/types/category'

type State = {
    data: Category[]
}

const initialState: State = {
    data: []
}

export const categorySlice = createGenericSlice({
    name: 'categories',
    initialState: initialState as GenericState<Category[]>,
    reducers: {}
})

export const actions = categorySlice.actions;