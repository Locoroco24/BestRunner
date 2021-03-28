import React from 'react';
import WorkoutTable from './components/SportTable/Table';
import {container} from './components/Styled';
import {getWorkouts} from "./store/actions";

function App() {

    React.useEffect(()=> getWorkouts());

    return (
        <div className={container}>
            <WorkoutTable />
        </div>
    )
}

export default App;
