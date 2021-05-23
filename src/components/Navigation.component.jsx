import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Navigation = (props) => {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => props.setLibraryOpen(!props.libraryOpen)}>
                <FontAwesomeIcon icon={faMusic} />
                Library
            </button>
        </nav>
    );
};

export default Navigation;
