import { PayloadAction } from '@reduxjs/toolkit'
import { MenuItem } from '../app/types/menuItem'
import { GenericActions, GenericState, createGenericSlice } from '../app/store/genericSlice'

type State = {
    data: MenuItem[]
}

const initialState: State = {
    data: []
}

export const menuItemSlice = createGenericSlice({
    name: 'menuItems',
    initialState: initialState as GenericState<MenuItem[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<MenuItem[]>) => {
                state.data = action.payload
                state.status = 'finished'
            },
            prepare: (menuItems: any) => {
                let item: MenuItem[] = [];
                Array.isArray(menuItems) ? item = menuItems : item.push(menuItems)
                const mapped = item.map((e: any) => {
                    return {
                        ...e,
                        //Future mapping here
                    }
                });
                return { payload: mapped }
            }
        },
    }
})

export const actions = menuItemSlice.actions as GenericActions<MenuItem[]>