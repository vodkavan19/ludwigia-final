export const getErrValidate = (arrSplitName, errValidObj) => {
    const [first, ...rest] = arrSplitName;
    return (
        (typeof(errValidObj[first]) === 'object')
        && (Object.keys(errValidObj[first])[0] !== 'message' )
    )
        ? getErrValidate(rest, errValidObj[first])
        : errValidObj[first];
}