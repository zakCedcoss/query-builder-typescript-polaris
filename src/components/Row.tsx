import { Card, Icon, Select, Stack, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { DeleteMajor } from "@shopify/polaris-icons";
import { RowType } from "../types";

type RowProps = {
  row: RowType;
  rowsArray: RowType[];
  handleSetRowsArray: (data: RowType[]) => void;
  isError: Boolean;
  handleSetIsError: (value: Boolean) => void;
};

function Row({
  row,
  rowsArray,
  handleSetRowsArray,
  isError,
  handleSetIsError,
}: RowProps) {
  const selectOne = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ];
  const selectTwo = [
    { label: "Equals", value: "Equals" },
    { label: "Not Equals", value: "Not Equals" },
    { label: "Contains", value: "Contains" },
    { label: "Not Contains", value: "Not Contains" },
    { label: "Start", value: "Start" },
  ];
  const selectThree = [
    { label: "V", value: "V" },
    { label: "W", value: "W" },
    { label: "X", value: "X" },
    { label: "Y", value: "Y" },
    { label: "Z", value: "Z" },
  ];

  const [firstSelect, setFirstSelect] = useState<string>("");
  const [secondSelect, setSecondSelect] = useState<string>("");
  const [thirdSelect, setThirdSelect] = useState<string>("");

  const [isFirstEmpty, setIsFirstEmpty] = useState<Boolean>(true);
  const [isSecondEmpty, setIsSecondEmpty] = useState<Boolean>(true);
  const [isThirdEmpty, setIsThirdEmpty] = useState<Boolean>(true);
  //   console.log(firstSelect, secondSelect, thirdSelect);
  //   console.log(row);

  const handleRowDelete = () => {
    const newRowsArray: RowType[] = rowsArray.filter(
      (rowEle: RowType) => rowEle.id !== row.id
    );
    handleSetRowsArray(newRowsArray);
  };

  const handleValueChange = (value: string, name: string) => {
    if (name === "firstSelect") {
      setFirstSelect(value);
      setSecondSelect("");
      setThirdSelect("");
      if (value === "") {
        setIsFirstEmpty(true);
      } else {
        setIsFirstEmpty(false);
      }
      setIsSecondEmpty(true);
      setIsThirdEmpty(true);
    }
    if (name === "secondSelect") {
      setSecondSelect(value);
      setThirdSelect("");
      if (value === "") {
        setIsSecondEmpty(true);
      } else {
        setIsSecondEmpty(false);
      }
      setIsThirdEmpty(true);
    }
    if (name === "thirdSelect") {
      setThirdSelect(value);
      if (value === "") {
        setIsThirdEmpty(true);
      } else {
        setIsThirdEmpty(false);
      }
    }
  };

  useEffect(() => {
    const updatedRow: RowType = {
      ...row,
      firstSelect,
      secondSelect,
      thirdSelect,
    };
    const updatedRowsArray: RowType[] = rowsArray.map((rowObj: RowType) => {
      if (rowObj.id === row.id) {
        return { ...rowObj, ...updatedRow };
      }
      return rowObj;
    });
    // console.log(updatedRowsArray);
    handleSetRowsArray(updatedRowsArray);
  }, [firstSelect, secondSelect, thirdSelect]);

  return (
    <div className="row">
      <Stack distribution="equalSpacing">
        <Stack.Item fill>
          <Select
            id="firstSelect"
            label="Select By"
            placeholder="Select"
            options={selectOne}
            onChange={handleValueChange}
            value={firstSelect}
            error={isError && isFirstEmpty ? true : false}
          />
        </Stack.Item>
        <Stack.Item fill>
          <Select
            id="secondSelect"
            label="Select By"
            placeholder="Select"
            options={selectTwo}
            onChange={handleValueChange}
            value={secondSelect}
            error={isError && isSecondEmpty ? true : false}
          />
        </Stack.Item>
        <Stack.Item fill>
          {secondSelect === "Equals" ? (
            <Select
              id="thirdSelect"
              label="Select By"
              placeholder="Select"
              options={selectThree}
              onChange={handleValueChange}
              value={thirdSelect}
              error={isError && isThirdEmpty ? true : false}
            />
          ) : (
            <TextField
              id="thirdSelect"
              label="Value"
              value={thirdSelect}
              onChange={handleValueChange}
              autoComplete="off"
              error={isError && isThirdEmpty ? true : false}
            />
          )}
        </Stack.Item>
        {rowsArray.length !== 1 && (
          <Stack.Item>
            <div className="delete" onClick={handleRowDelete}>
              <Icon source={DeleteMajor} color="base" />
            </div>
          </Stack.Item>
        )}
      </Stack>
    </div>
  );
}

export default Row;
