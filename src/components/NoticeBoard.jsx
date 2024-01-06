import React, { useState } from 'react';
import './NoticeBoard.css';
import DragMove from "./DragMove";
import StickyNote from './StickyNote';
const translateData = [
    { x: 0, y: 0 }
];
const stickyNoteListData = [
    {
        id: 0,
        message: "Important Note",
        isPinned: false,
    }
];
const NoticeBoard = () => {
    debugger
    if (!window.localStorage.getItem('translate')){
        window.localStorage.setItem('translate', JSON.stringify(translateData));
    }
    if (!window.localStorage.getItem('stickyNoteList')) {
        window.localStorage.setItem('stickyNoteList', JSON.stringify(stickyNoteListData));
    }
    const translateArr = JSON.parse(window.localStorage.getItem('translate'));
    const stickyNoteArr = JSON.parse(window.localStorage.getItem('stickyNoteList'));
    const [translate, setTranslate] = useState(translateArr);
    const [stickyNoteList, setStickyNoteList] = useState(stickyNoteArr);

    const handleDragMove = (e, id) => {
        if (stickyNoteList[id].isPinned) return
        const newObj = [...translate];
        newObj[id] = {
            x: translate[id].x + e.movementX,
            y: translate[id].y + e.movementY,
        };
        window.localStorage.setItem('translate', JSON.stringify(newObj));
        setTranslate(newObj);
    };

    const addStickyNote = () => {
        let translateObj = {
            x: 0,
            y: 0
        }
        let newStickyNoteObj = {
            id: stickyNoteList.length,
            message: "New Note",
            isPinned: false,
        }
        window.localStorage.setItem('translate', JSON.stringify([...translate, translateObj]));
        setTranslate(prev => [...prev, translateObj]);
        window.localStorage.setItem('stickyNoteList', JSON.stringify([...stickyNoteList, newStickyNoteObj]));
        setStickyNoteList(prev => [...prev, newStickyNoteObj]);
     
    }
    const deleteStickyNote = (id) => {
        const translateArr = translate.filter((curr, index) => index !== id);
        window.localStorage.setItem('translate', JSON.stringify(translateArr));
        setTranslate(translateArr);
        const stickyNoteArr = stickyNoteList.filter((curr, index) => index !== id);
        window.localStorage.setItem('stickyNoteList', JSON.stringify(stickyNoteArr));
        setStickyNoteList(stickyNoteArr);
    }

    const handleIsPinned = (id) => {
        const arr = [...stickyNoteList];
        arr[id].isPinned = !stickyNoteList[id].isPinned;
        window.localStorage.setItem('stickyNoteList', JSON.stringify(arr));
        setStickyNoteList(arr);
    }

    const handleNoteChange = (id, val) => {
        const arr = [...stickyNoteList];
        arr[id].message = val;
        window.localStorage.setItem('stickyNoteList', JSON.stringify(arr));
        setStickyNoteList(arr);
    }


    return (
        <div className='container'>
            <div className='note-container'>
                {stickyNoteList.map((curr, index) => (
                    <DragMove onDragMove={(e) => handleDragMove(e, index)} key={index}>
                        <div style={{ transform: `translateX(${translate[index].x}px) translateY(${translate[index].y}px)` }}>
                            <StickyNote index={index} id={curr.id} message={curr.message} isPinned={curr.isPinned} onDelete={() => deleteStickyNote(index)} onPinned={() => handleIsPinned(index)} onNoteChange={handleNoteChange} />
                        </div>
                    </DragMove>
                ))
                }
            </div>
            <button className="add-button" onClick={() => addStickyNote()}>
                +
            </button>
        </div>
    );
};

export default NoticeBoard;
