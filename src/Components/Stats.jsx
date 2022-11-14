import React from 'react'

const Stats = ({wpm, accuracy}) => {
  return (
    <div className="stats-box">
        <div className="left-stats">
            {/* division for numbers of user */}
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">30/2/3/3</div>
            {/* typed chars/incorrect/extra/missed */}
        </div>
        <div className="right-stats">
            {/* division for charts of user */}
            graphs will go here
        </div>
    </div>
  )
}

export default Stats