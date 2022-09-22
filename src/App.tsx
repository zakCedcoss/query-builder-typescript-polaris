import { Button, Card, TextStyle } from "@shopify/polaris";
import { useEffect, useState } from "react";
import "./App.css";
import Group from "./components/Group";
import { GroupType, RowType } from "./types";

function App() {
  const [groupsArray, setGroupsArray] = useState<GroupType[]>([
    {
      id: Math.floor(Math.random() * 5684567),
      rowsArray: [],
    },
  ]);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<Boolean>(false);

  useEffect(() => {
    let interval = setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    return () => clearInterval(interval);
  }, [errorMessage, isError]);

  useEffect(() => {
    let s: string = "";
    groupsArray?.map((g: GroupType, j: number) => {
      if (j > 0) {
        if (
          g.rowsArray.length &&
          g.rowsArray[0].firstSelect &&
          g.rowsArray[0].secondSelect &&
          g.rowsArray[0].thirdSelect
        ) {
          s += " OR ";
        }
      }

      g.rowsArray?.map((r: RowType, i: number) => {
        const { firstSelect, secondSelect, thirdSelect } = r;
        if (i > 0) {
          if (firstSelect !== "" && secondSelect !== "" && thirdSelect !== "") {
            s += " AND ";
          }
        }
        if (firstSelect && secondSelect && thirdSelect) {
          s += `${firstSelect} ${secondSelect} ${thirdSelect}`;
        }
      });
    });

    setMessage(s);
  }, [groupsArray]);

  const handleSetGroupsArray = (data: GroupType[]) => {
    setGroupsArray(data);
  };

  const handleSetIsError = (value: Boolean) => {
    setIsError(value);
  };

  const handleAddGroup = (): void => {
    const newGroup: GroupType = {
      id: Math.floor(Math.random() * 5684567),
      rowsArray: [],
    };
    setGroupsArray([...groupsArray, newGroup]);
    setIsError(false);
  };

  const handleSubmit = (): void => {
    let error: Boolean = false;
    groupsArray.map((g) => {
      g.rowsArray.map((r) => {
        if (
          r.firstSelect === "" ||
          r.secondSelect === "" ||
          r.thirdSelect === ""
        ) {
          error = true;
        }
      });
    });
    if (error) {
      console.log("Please fill all fields !!!");
      setErrorMessage("Please fill all fields !!!");
      setIsError(true);
    } else {
      console.log(groupsArray);
      setErrorMessage("Check CONSOLE.LOG in Developer Tool");
      setIsError(false);
    }
  };

  // console.log(groupsArray);
  // console.log(message);

  return (
    <div className="App">
      <Card>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {message && (
          <div className="query">
            <TextStyle>{message}</TextStyle>
          </div>
        )}

        {groupsArray.map((group) => {
          return (
            <Group
              key={group.id}
              group={group}
              groupsArray={groupsArray}
              handleSetGroupsArray={handleSetGroupsArray}
              isError={isError}
              handleSetIsError={handleSetIsError}
              handleAddGroup={handleAddGroup}
            />
          );
        })}
        <div className="see-query-result">
          <Button primary>See Query Result</Button>
        </div>
      </Card>
      <div className="submit-btn">
        <Button primary onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
