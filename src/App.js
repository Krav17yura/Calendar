import React, {useState} from 'react'
import './App.css';
import styled, {css} from 'styled-components'


const calendarDates = Array(31)
    .fill(0)
    .map((e, i) => i);


function App() {
    const [choosingType, setChoosingType] = useState('start')
    const [startDate, setStartData] = useState(null)
    const [endData, setEndDate] = useState(null)
    const [hoverDay, setHoverDay] = useState(null)


    const updateData = (day) => {
        if (startDate && day < startDate) {
            setStartData(day)
            return setChoosingType('end')
        }

        if (endData && day > endData) {
            setEndDate(day)
            return setChoosingType('end')
        }

        if (choosingType === 'start') {
            setStartData(day)
            return setChoosingType('end')

        }
        if (choosingType === 'end') {
            setEndDate(day)
        }

    }

    const checkInBetween = (day) => {
        if (startDate && !endData) return day > startDate && day < hoverDay;
        return day > startDate && day < endData;
    }

    return (
        <>
            <StyledDateChooser>
                <StyledDateChooserButton
                    onClick={() => setChoosingType('start')}
                    isChoosing={choosingType === 'start'}
                >
                    Start Date <span>{startDate}</span>
                </StyledDateChooserButton>
                <StyledDateChooserButton
                    onClick={() => setChoosingType('end')}
                    isChoosing={choosingType === 'end'}
                >
                    End Date <span>{endData}</span>
                </StyledDateChooserButton>
            </StyledDateChooser>

            <StyledCalendar>
                {calendarDates.map((day, index) => {
                    const dayNumber = day + 1
                    let isInBetween = checkInBetween(dayNumber)
                    let isSelected = dayNumber === startDate || dayNumber === endData
                    return (
                        <StyledCalendarDay
                            key={index}
                            isInBetween={isInBetween}
                            isSelected={isSelected}
                            onClick={() => updateData(dayNumber)}
                            onMouseOver={() => setHoverDay(dayNumber)}
                        >
                            {dayNumber}
                        </StyledCalendarDay>
                    );
                })}
            </StyledCalendar>
        </>
    );
}

export default App;


const StyledDateChooser = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
    color: #0b204c;
    text-transform: uppercase;
    flex: 1;
    padding: 15px;
    background: none;
    cursor: pointer;
    border: none;
    border-bottom: 2px solid rgba(11, 32, 76, 0.2);
    outline: none;
    border-color: ${(props) => (props.isChoosing ? '#0b204c' : 'none')} ;
    
    span{
        display: block;
        min-height: 60px;
        font-size: 50px;
    }
`;

const StyledCalendar = styled.div`
    max-width: 400px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background: #0b204c;
    color: #fff;
    padding: 20px;
`;

const StyledCalendarDay = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: 0.3s ease background;
    border: none;
    outline: none;
    cursor: pointer;
    color: #8096c1;
    background: none;
    
    
    ${(props) =>
    props.isSelected &&
    css`
         color: #eee;
         background: #4e7377  !important;
       `
}
    
     ${(props) =>
    props.isInBetween &&
    css`
         color: #eee;
         background: #254381 !important;
       `
}
    
    &:hover{
     color: #eee;
     background: #254381;
    }
`;