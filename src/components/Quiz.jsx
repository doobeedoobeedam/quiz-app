/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Timer from './Timer';

const cardStyle = css`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
    padding: 30px 40px;
    margin: 20px 5px;
    width: 650px; 
    height: 400px; 
`;

const questionStyle = css`
    min-height: 105px;
    overflow-y: auto;
`;

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timerOver, setTimerOver] = useState(false);
    const [loading, setLoading] = useState(true);
    const name = localStorage.getItem('username');

    useEffect(() => {
        const fetchQuestions = async (amount = 15, category = 9, difficulty = 'easy') => {
            const cacheKey = `questions_${amount}_${category}_${difficulty}`;

            const cachedQuestions = localStorage.getItem(cacheKey);
            if (cachedQuestions) {
                setQuestions(JSON.parse(cachedQuestions));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);

                if (!response.ok) {
                    if (response.status === 429) {
                        alert("Too many requests. Please try again later.");
                    }
                    throw new Error('Failed to fetch questions');
                }

                const data = await response.json();
                setQuestions(data.results);
                localStorage.setItem(cacheKey, JSON.stringify(data.results));
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const question = questions[currentQuestion];
            const allAnswers = [...question.incorrect_answers, question.correct_answer];

            setAnswers(shuffleArray(allAnswers));
        }
    }, [questions, currentQuestion]);

    const decodeHTML = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleAnswer = (selectedAnswer) => {
        const question = questions[currentQuestion];
        if (selectedAnswer === question.correct_answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null); 
        } else {
            setTimerOver(true);
        }
    };

    if (loading) {
        return <div>Loading questions...</div>;
    }

    if (timerOver) {
        return (
            <div>
                <h2>Quiz Completed!</h2>
                <p>Your score: {score}/{questions.length}</p>
            </div>
        );
    }

    const current = questions[currentQuestion];

    return (
        <div css={cardStyle}>
            <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <p css={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{name}</p>
                <Timer setTimerOver={setTimerOver} />
            </div>
            <p css={{ marginBottom: '-10px', fontSize: '14px', color: '#656565' }}>Question {currentQuestion + 1} of {questions.length}</p>
            <div css={questionStyle}>
                <h3 css={{ fontSize: '21px' }}>{decodeHTML(current.question)}</h3>
            </div>

            <div css={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(answer)} disabled={selectedAnswer !== null && selectedAnswer !== answer}>
                        {decodeHTML(answer)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
