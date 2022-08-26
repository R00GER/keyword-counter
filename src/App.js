import { isEmpty } from "ramda";
import { useCallback, useEffect, useState } from "react";
import Keywords from "./Keywords";
import DialogComponent from "./components/DialogComponent";
import Panel from "./components/Panel";
import ActionButton from "./components/ActionButton";
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
  const [isSentence, setIsSentence] = useState(false);

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
      .replace(/\n/g, " ")
      .replace(/\./g, "")
      .replace(/\,/g, "")
      .split(" ");

    const wordsFilteredByKeywords = words
      .map((w) => {
        const keyword = keywords.find((k) => w.trim().includes(k.trim()));
        return keyword ? { keyword, w } : null;
      })
      .filter(Boolean);

    const occurences =
      wordsFilteredByKeywords &&
      wordsFilteredByKeywords.reduce((acc, curr) => {
        acc[curr.keyword] ? ++acc[curr.keyword] : (acc[curr.keyword] = 1);
        return acc;
      }, {});

    const keywordsOccurencesWords =
      occurences &&
      Object.entries(occurences).map(([key, value]) => ({
        key,
        value,
        uniqueWords: [
          ...new Set(
            wordsFilteredByKeywords
              .filter((w) => w.keyword === key)
              .map((obj) => obj.w)
          ),
        ],
        uniqueWordsCSV: [
          ...new Set(
            wordsFilteredByKeywords
              .filter((w) => w.keyword === key)
              .map((obj) => obj.w)
          ),
        ].join("\r\n"),
        words: wordsFilteredByKeywords.filter((w) => w.keyword === key),
      }));

    if (occurences) {
      setOccurences({ show: true, values: keywordsOccurencesWords });
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
      console.log(word);
      console.log(word.split(" "));
      const existing = keywords.find(
        (k) => k.toLowerCase() === word.toLowerCase()
      );
      if (!existing) {
        word.includes(" ") && !isSentence
          ? setKeywords([...keywords, ...word.split(" ").filter(Boolean)])
          : setKeywords([...keywords, word]);

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
          <Keywords
            keywords={keywords}
            setKeywords={setKeywords}
            onChange={(v) => setIsSentence(v)}
            checkboxValue={isSentence}
          />
        </Panel>
        <div
          className="bottom"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            margin: "1rem 0",
          }}
        >
          <ActionButton
            onClick={() => setKeywords([])}
            disabled={keywordsEmpty}
            label="Clear"
          />
          <ActionButton
            onClick={getOccurences}
            disabled={keywordsEmpty || !texts.toBeParsed}
            label="Run"
          />
        </div>
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
