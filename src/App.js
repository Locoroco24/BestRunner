import React from 'react';
import WorkoutTable from './components/SportTable/Table';
import {container} from './components/Styled';

function App() {

    return (
        <div className={container}>
            <WorkoutTable />
        </div>
    )
}

export default App;
