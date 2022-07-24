import { isEmpty } from "ramda";
import { useCallback, useEffect, useState } from "react";
import Keywords from "./Keywords";
import DialogComponent from "./components/DialogComponent";
import Panel from "./components/Panel";
import RunButton from "./components/RunButton";
import { InputFieldWithActionIcon, TextAreaField } from "./components/Fields";
import "./App.css";
import AppBar from "./components/AppBar";

function App() {
  const [user, setUser] = useState({
    id: window.localStorage.getItem("active")
      ? JSON.parse(window.localStorage.getItem("active"))
      : 0,
  });
  const [texts, setTexts] = useState({ toBeParsed: "", keyword: "" });
  const [keywords, setKeywords] = useState([]);
  const [occurences, setOccurences] = useState({ show: false, values: null });

  useEffect(() => {
    const fromLocalStorage = JSON.parse(window.localStorage.getItem(user.id));

    if (fromLocalStorage) {
      setTexts({
        ...texts,
        toBeParsed: fromLocalStorage[user.id].items.toBeParsed,
      });
      setKeywords([...fromLocalStorage[user.id].items.keywords]);
    } else {
      setTexts({ toBeParsed: "", keyword: "" });
      setKeywords([]);
    }

    window.localStorage.setItem("active", JSON.stringify(user.id));
  }, [user.id]);

  const getOccurences = useCallback(() => {
    const words = texts.toBeParsed
      .toString()
      .toLowerCase()
      .replace(/\r\n/g, " ")
      .split(" ");

    const wordsFilteredByKeywords = words.filter((w) => {
      return keywords.find((k) => w.includes(k));
    });

    const occurences = wordsFilteredByKeywords.reduce((acc, curr) => {
      acc[curr] ? ++acc[curr] : (acc[curr] = 1);
      return acc;
    }, {});

    if (occurences) {
      setOccurences({ show: true, values: occurences });
    }
  }, [texts.toBeParsed, keywords]);

  const handleSetTexts = ({ name, value }) => {
    setTexts({ ...texts, [name]: value });

    const toLocalStorage = {
      [user.id]: {
        items: {
          keywords,
          toBeParsed: texts.toBeParsed,
        },
      },
    };

    window.localStorage.setItem(user.id, JSON.stringify(toLocalStorage));
    window.localStorage.setItem("active", JSON.stringify(user.id));
  };

  const handleSetKeywords = (word) => {
    if (word) {
      const existing = keywords.find(
        (k) => k.toLowerCase() === word.toLowerCase()
      );
      if (!existing) {
        setKeywords([...keywords, word]);

        const toLocalStorage = {
          [user.id]: {
            items: {
              keywords: [...keywords, word],
              toBeParsed: texts.toBeParsed,
            },
          },
        };

        window.localStorage.setItem(user.id, JSON.stringify(toLocalStorage));
        window.localStorage.setItem("active", JSON.stringify(user.id));

        setTexts({ ...texts, keyword: "" });
      } else {
        // todo: show error
        console.log("existing");
      }
    }
  };

  const closeDlg = () => setOccurences({ show: false, occurences: null });

  const keywordsEmpty = isEmpty(keywords);

  return (
    <div className="App">
      <AppBar user={user} setUser={setUser} />
      <div className="main">
        <Panel title="Text" containerClass="panel-left">
          <TextAreaField
            name="toBeParsed"
            value={texts.toBeParsed}
            onChange={(e) => handleSetTexts(e.target)}
            placeholder="Add text to count occurances"
            minRows={15}
            maxRows={15}
          />
        </Panel>
        <Panel title="Keywords" containerClass="panel-right">
          <InputFieldWithActionIcon
            name="keyword"
            value={texts.keyword}
            onChange={(e) => handleSetTexts(e.target)}
            onClick={() => handleSetKeywords(texts.keyword)}
            placeholder={keywordsEmpty ? "Add at least one keyword" : "Keyword"}
            autoComplete="off"
          />
          <Keywords keywords={keywords} setKeywords={setKeywords} />
        </Panel>
        <RunButton
          onClick={getOccurences}
          disabled={keywordsEmpty || !texts.toBeParsed}
        />
        <DialogComponent
          open={occurences.show}
          value={occurences.values}
          onClose={closeDlg}
        />
      </div>
    </div>
  );
}

export default App;
