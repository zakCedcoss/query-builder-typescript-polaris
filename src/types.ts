export type RowType = {
    id: number,
    firstSelect: string,
    secondSelect: string,
    thirdSelect: string,
}

export type GroupType = {
    id : number,
    rowsArray: RowType[]
}