import { useEffect, useState } from "react";
import Row from "./Row";
import { GroupType, RowType } from "../types";
import { Button, ButtonGroup, Card, Stack } from "@shopify/polaris";

type GroupProps = {
  group: GroupType;
  groupsArray: GroupType[];
  handleSetGroupsArray: (data: GroupType[]) => void;
  isError: Boolean;
  handleSetIsError: (value: Boolean) => void;
  handleAddGroup: () => void;
};

function Group({
  group,
  groupsArray,
  handleSetGroupsArray,
  isError,
  handleSetIsError,
  handleAddGroup,
}: GroupProps) {
  const [rowsArray, setRowsArray] = useState<RowType[]>([
    {
      id: Math.floor(Math.random() * 554861277),
      firstSelect: "",
      secondSelect: "",
      thirdSelect: "",
    },
  ]);

  useEffect(() => {
    const updatedGroupsArray: GroupType[] = groupsArray.map(
      (groupObj: GroupType) => {
        if (groupObj.id === group.id) {
          return { ...groupObj, rowsArray };
        }
        return groupObj;
      }
    );

    // console.log(updatedGroupsArray);
    handleSetGroupsArray(updatedGroupsArray);
  }, [rowsArray]);

  const handleSetRowsArray = (data: RowType[]) => {
    setRowsArray(data);
  };

  const handleAddRow = (): void => {
    const newRow: RowType = {
      id: Math.floor(Math.random() * 55486127),
      firstSelect: "",
      secondSelect: "",
      thirdSelect: "",
    };
    setRowsArray([...rowsArray, newRow]);
    handleSetIsError(false);
  };

  const handleGroupDelete = (): void => {
    const updatedGroupsArray: GroupType[] = groupsArray.filter(
      (groupEle: GroupType) => groupEle.id !== group.id
    );
    handleSetGroupsArray(updatedGroupsArray);
  };

  //   console.log(rowsArray);

  return (
    <div className="group">
      <Card sectioned>
        {rowsArray.map((row) => {
          return (
            <Row
              key={row.id}
              row={row}
              rowsArray={rowsArray}
              handleSetRowsArray={handleSetRowsArray}
              isError={isError}
              handleSetIsError={handleSetIsError}
            />
          );
        })}
        <div className="add-row-btn">
          <Button plain onClick={handleAddRow}>
            Add Row
          </Button>
        </div>
      </Card>
      <div className="remove-group-btn">
        <ButtonGroup>
          {group.id === groupsArray[groupsArray.length - 1].id && (
            <Button onClick={handleAddGroup}>Add Group</Button>
          )}
          {groupsArray.length > 1 && (
            <Button destructive onClick={handleGroupDelete}>
              Remove Group
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Group;
