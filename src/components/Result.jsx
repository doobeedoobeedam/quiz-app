import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ score, totalQuestions }) => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/quiz');
    };

    return (
        <div>
            <h2>Quiz Completed!</h2>
            <p>Correct Answers: {score}</p>
            <p>Total Questions: {totalQuestions}</p>
            <button onClick={handleRetry}>Try Again</button>
        </div>
    );
};

export default Result;