import React from 'react'
import Translator from './Translator'
import Recorder from './Recorder'
import Chat from './Chat'
import Tester from './Tester'

const Utilities: React.FC = () => {
    return (
        <aside>
            <Chat />
            <Recorder />
            {/* <Tester /> */}
        </aside>
    )
}

/* <Translator /> */

export default Utilities;