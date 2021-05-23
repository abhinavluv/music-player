import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
    // Audio Ref
    const audioRef = useRef(null);

    useEffect(() => {
        const loadSong = async () => {
            const playPromise = await audioRef.current[
                props.isPlaying ? 'play' : 'pause'
            ]();
        };
        loadSong();
    }, [props.isPlaying, props.currentSong]);

    useEffect(() => {
        const newSongs = props.songs.map((newSong) => {
            if (newSong.id === props.currentSong.id) {
                return { ...newSong, active: true };
            } else {
                return { ...newSong, active: false };
            }
        });
        props.setSongs(newSongs);
    }, [props.currentSong]);

    // const playSongHandler = () => {
    //     if (props.isPlaying) {
    //         audioRef.current.pause();
    //         props.setIsPlaying(!props.isPlaying);
    //     } else {
    //         audioRef.current.play();
    //         props.setIsPlaying(!props.isPlaying);
    //     }
    // };

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const timeUpdateHandler = (event) => {
        const current = event.target.currentTime;
        const songDuration = event.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: songDuration,
        });
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ':' +
            ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragSliderHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({ ...songInfo, currentTime: event.target.value });
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = props.songs.findIndex(
            (song) => song.id === props.currentSong.id
        );
        if (direction === 'skip-forward') {
            props.setCurrentSong(
                props.songs[(currentIndex + 1) % props.songs.length]
            );
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % props.songs.length === -1) {
                props.setCurrentSong(props.songs[props.songs.length - 1]);
                return;
            }
            props.setCurrentSong(
                props.songs[(currentIndex - 1) % props.songs.length]
            );
        }
    };

    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    type='range'
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragSliderHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className='skip-back'
                    icon={faAngleLeft}
                    size='2x'
                />
                <FontAwesomeIcon
                    className='play'
                    icon={props.isPlaying ? faPause : faPlay}
                    size='2x'
                    onClick={() => props.setIsPlaying(!props.isPlaying)}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className='skip-forward'
                    icon={faAngleRight}
                    size='2x'
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={props.currentSong.audio}></audio>
        </div>
    );
};

export default Player;
