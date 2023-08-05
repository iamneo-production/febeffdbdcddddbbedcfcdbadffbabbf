import { useEffect, useRef, useState } from 'react'
export default function StopWatch() {
    const timerRef = useRef()
    const [MilliSeconds, setMilliSeconds] = useState(0)
    const [Minutes, setMinutes] = useState(0)
    const [Seconds, setSeconds] = useState(0)
    const [buttonState, setButtonState] = useState({
        showStart: true,
        disabledReset: true,
        showPause: false,
        showResume: false
    })
    function timer() {
        setMilliSeconds(prev => prev + 1)
        if (MilliSeconds === 60) {
            setMilliSeconds(0);
            setSeconds(prev => prev + 1)
        }
        if (Seconds === 60) {
            setMinutes(prev => prev + 1)
            setSeconds(0)
        }
    }
    function pauseTimer() {
        setButtonState(prev => {
            return {
                ...prev,
                showResume: true,
                showPause: false
            }
        })
        clearInterval(timerRef.current)
    }
    function resetTimer() {
        clearInterval(timerRef.current)
        setButtonState({
            showStart: true,
            disabledReset: true,
            showPause: false,
            showResume: false
        })
        setSeconds(0);
        setMilliSeconds(0);
        setMinutes(0);
    }
    function resumeTimer() {
        setButtonState(prev => {
            return {
                ...prev,
                showResume: false,
                showPause: true
            }
        })
        timerRef.current = setInterval(timer, 1000)
    }
    function startTimer() {
        setButtonState(prev => {
            return {
                ...prev,
                showStart: false,
                showPause: true,
                disabledReset: false
            }
        })
        timerRef.current = setInterval(timer, 1000)
    }
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }
    }, [])
    return <div style={{ backgroundColor: '#54bde1', height: '550px', width: '45%', borderRadius: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', height: '75%', width: '99%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '40px', }}>React Stopwatch</p>
            <p data-testid="time" style={{ fontWeight: 'bold', fontSize: '38px', marginTop: '2vh' }}>{Minutes < 10 ? `0${Minutes}` : Minutes} : {Seconds<10?`0${Seconds}`:Seconds} : {MilliSeconds<10?`0${MilliSeconds}`:MilliSeconds}</p>
            <div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'row', gap: '1vw' }}>
                {
                    buttonState.showStart &&
                    <button data-testid="start" onClick={() => startTimer()} style={{ width: '120px', padding: '12px', fontWeight: 'bold', border: '3px solid gray', borderRadius: '4px', cursor: 'pointer' }}>Start</button>

                }
                {
                    buttonState.showPause &&
                    <button data-testid="pause" onClick={() => pauseTimer()} style={{ width: '120px', padding: '12px', fontWeight: 'bold', border: '3px solid gray', borderRadius: '4px', cursor: 'pointer' }}>Pause</button>
                }
                {
                    buttonState.showResume &&
                    <button data-testid="resume" onClick={() => resumeTimer()} style={{ width: '120px', padding: '12px', fontWeight: 'bold', border: '3px solid gray', borderRadius: '4px', cursor: 'pointer' }}>Resume</button>
                }
                <button disabled={buttonState.disabledReset} onClick={() => { !buttonState.disabledReset && resetTimer() }} data-testid="reset" style={{ width: '120px', padding: '12px', fontWeight: 'bold', border: '3px solid gray', borderRadius: '4px', cursor: !buttonState.disabledReset && 'pointer' }}>Reset</button>
            </div>
        </div>
    </div>
}