import React, { useState } from 'react';

const TouchHandler = ({ onSwipeLeft, onSwipeRight, onSwipeDown, onTap }) => {
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setTouchStartX(touch.clientX);
        setTouchStartY(touch.clientY);
    };

    const handleTouchEnd = (event) => {
        if (touchStartX === null || touchStartY === null) return;

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            onSwipeRight();
        } else {
            onSwipeLeft();
        }
        } else if (Math.abs(deltaY) > 30) {
        // Vertical swipe
        onSwipeDown();
        } else {
        // Tap
        onTap();
        }

        setTouchStartX(null);
        setTouchStartY(null);
    };

    return (
        <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
        />
    );
};

export default TouchHandler;
