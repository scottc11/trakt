
function convertRange( value, valueMin, valueMax, outMin, outMax ) {
    return ( value - valueMin ) * ( outMax - outMin ) / ( valueMax - valueMin ) + outMin;
}

export default convertRange;
