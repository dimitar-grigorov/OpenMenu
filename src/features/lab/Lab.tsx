import { Button } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from '../../app/store/store'
import { decrement, increment, incrementByAmount } from './testSlice';
import { openModal } from '../../app/common/modals/modalSlice';
import { sampleData } from './sampleData';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../app/config/firebase';

export default function Lab() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.test);

    function seedData() {
        sampleData.forEach(async event => {
            const { _id, ...rest } = event;
            console.log(`Adding document with ID: ${_id}`, rest);
            await setDoc(doc(db, 'foodItems', _id), {
                ...rest
            })
        })
    }

    return (
        <div>
            <h1>lab page</h1>
            <h3>The data is: {data}</h3>
            <Button onClick={() => dispatch(increment())} color='green' content='Increment' />
            <Button onClick={() => dispatch(decrement())} color='red' content='Decrement' />
            <Button onClick={() => dispatch(incrementByAmount(7))} color='teal' content='Increment by 7' />
            <Button
                onClick={() => dispatch(openModal({ type: 'TestModal', data: data }))}
                color='teal' content='Open modal' />
            <Button
                inverted={true}
                color='teal'
                content='Seed data'
                onClick={seedData}
            />
        </div>
    )
}