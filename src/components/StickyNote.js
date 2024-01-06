import React, { useState, useRef, useEffect } from 'react';
import './StickyNote.css';

const StickyNote = ({ index, message, isPinned, onDelete, onPinned, onNoteChange }) => {
    const [text, setText] = useState(message);
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef(null);
    useEffect(() =>{
       if(isEditing){
           textRef.current.focus();
       }
    },[isEditing])

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = (e) => {
        setIsEditing(false);
        onNoteChange(index, e.target.value)
    };

    const handleChange = (e) => {
        if(e.target.value?.length > 200) return;
        setText(e.target.value);
    };

    const handleDelete = () => {
        onDelete();
    };

    const pinNote = () => {
        // setIsPinned(prev => !prev)
        onPinned()
    }
    const handleDragStart = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className={`sticky-note ${isEditing ? 'editing' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e)}
        >
            <div className='flex-container'>
                <button className={`${isPinned ? 'unpin-button' : 'pin-button'}`} onClick={() => pinNote()}>
                    {isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button className="delete-button" onClick={() => handleDelete()}>
                    &times;
                </button>
            </div>
            <div className="content" onDoubleClick={handleDoubleClick}>
                {isEditing ? (
                    <textarea
                        ref={textRef}
                        className="editable-text"
                        value={text}
                        onChange={(e) => handleChange(e)}
                        autoFocus
                        maxLength='200'
                        cols='12'
                        rows='6'
                        onBlur={(e) => handleBlur(e)}
                    />
                ) : (
                    <p className="display-text">{text}</p>
                )}
            </div>
            
        </div>
    );
};

export default StickyNote;
