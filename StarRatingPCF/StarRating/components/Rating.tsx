import * as React from 'react';
import { Rating, RatingSize } from '@fluentui/react/lib/Rating';
import {Label} from '@fluentui/react/lib/Label'


export interface IRating {
    rating: number;
    maxValue: number;
}

export const MyRating = ({rating, maxValue}:IRating):JSX.Element => {

const divStyle:React.CSSProperties = {
    display: 'flex'
}

const labelStyle:React.CSSProperties = {
    position: 'relative',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    color: '#666666',
    verticalAlign: 'center',
    marginTop: '50%'
}

const childrenStyle: React.CSSProperties = {
    borderColor: '#666666',
    borderStyle: 'solid'
}

    return (
        <div style={divStyle}>
            <div style={childrenStyle}>
            <Rating
            max={maxValue}
            size={RatingSize.Large}
            rating={rating}
            readOnly
            allowZeroStars
            />
            </div>
            <div style={childrenStyle}>
            <Label style={labelStyle}>{rating}/{maxValue}</Label>
            </div>
      </div>
    )

}