import React from 'react';

const Song = (props) => {
    const songSelectedHandler = () => {
        props.setCurrentSong(props.song);

        const newSongs = props.songs.map((newSong) => {
            if (newSong.id === props.song.id) {
                return { ...newSong, active: true };
            } else {
                return { ...newSong, active: false };
            }
        });
        props.setSongs(newSongs);
    };

    return (
        <div
            className={`library-song ${props.song.active ? 'selected' : ''}`}
            onClick={songSelectedHandler}>
            <img src={props.song.cover} alt={props.song.name}></img>
            <div className='song-description'>
                <h3>{props.song.name}</h3>
                <h4>{props.song.artist}</h4>
            </div>
        </div>
    );
};

export default Song;
