import { Button } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from '../../app/store/store'
import { decrement, increment, incrementByAmount } from './testSlice';

export default function Lab() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.test);
    return (
        <div>
            <h1>lab page</h1>
            <h3>The data is: {data}</h3>
            <Button onClick={() => dispatch(increment())} color='green' content='Increment' />
            <Button onClick={() => dispatch(decrement())} color='red' content='Decrement' />
            <Button onClick={() => dispatch(incrementByAmount(5))} color='teal' content='Increment by 5' />
        </div>
    )
}