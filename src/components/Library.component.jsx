import React from 'react';
import LibrarySong from './LibrarySong.component';

const library = (props) => {
    return (
        <div className={`library ${props.libraryOpen ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {props.songs.map((song) => (
                    <LibrarySong
                        song={song}
                        key={song.id}
                        setCurrentSong={props.setCurrentSong}
                        songs={props.songs}
                        setSongs={props.setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default library;
