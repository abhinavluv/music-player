import React, { useState } from 'react';
import './styles/App.scss';

import Song from './components/Song.component';
import Player from './components/Player.component';
import Library from './components/Library.component';
import Navigation from './components/Navigation.component';
import data from './util';

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);

    return (
        <div className={`App ${libraryOpen ? 'library-active' : ''}`}>
            <Navigation
                libraryOpen={libraryOpen}
                setLibraryOpen={setLibraryOpen}
            />
            <Song currentSong={currentSong} />
            <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
                libraryOpen={libraryOpen}
            />
        </div>
    );
}

export default App;
