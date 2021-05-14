export const convertToUint8 = (str) => {
    let parsedValues = Object.values(str);
    let newArr = new Uint8Array(parsedValues);

    console.log(newArr)

    return newArr;
}