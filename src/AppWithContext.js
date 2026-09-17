import { createContext, useContext, useEffect, useState } from "react";
import { FaTwitter, FaRedditAlien, FaQuoteLeft } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { colors } from "./colorData.js";

const QUOTE_LIMIT = 1450; // api quote limit is 1450 so added limit
const COLOR_LIMIT = colors.length;

const QuoteContext = createContext();

export default function App() {
  return (
    <div className="app">
      <Header />
      <QuoteMachine />
    </div>
  );
}

function QuoteMachine() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getQuote() {
    try {
      setIsLoading(true);
      setError(null);

      const randomNum = Math.floor(Math.random() * QUOTE_LIMIT) + 1;
      const colorNum = Math.floor(Math.random() * COLOR_LIMIT);

      const res = await fetch(`https://dummyjson.com/quotes/${randomNum}`);

      if (!res.ok) throw new Error("Something went wrong while getting quote");
      const resJson = await res.json();

      const quote = resJson.quote;
      const author = resJson.author;
      const color = colors[colorNum];
      document.documentElement.style.setProperty("--primary-color", color);

      setQuote(quote);
      setAuthor(author);
    } catch (err) {
      setError("something went wrong while fetching Quotes");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <QuoteContext.Provider
      value={{
        quote,
        author,
        handleNewQuote: getQuote,
        errMsg: error,
      }}
    >
      <div className="quote-machine">
        {error ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <QuoteBox />
            <Creator />
          </>
        )}
      </div>
    </QuoteContext.Provider>
  );
}

function QuoteBox() {
  return (
    <div id="quote-box">
      <Quote />
      <Author />
      <SocialBox>
        <ShareLinks />
        <NewQuoteButton />
      </SocialBox>
    </div>
  );
}

function SocialBox({ children }) {
  return <div className="social-box">{children}</div>;
}

function Quote() {
  const { quote } = useContext(QuoteContext);
  return (
    <p id="text">
      <FaQuoteLeft /> {quote}
    </p>
  );
}

function Author() {
  const { author } = useContext(QuoteContext);
  return <p id="author">- {author}</p>;
}

function Header() {
  return <h1 className="header">Random Quote Machine</h1>;
}

function Loading() {
  return <p className="loading">Loading Quotes...</p>;
}

function Creator() {
  return <p className="creator">by Satyam</p>;
}

function ShareLinks() {
  const { quote, author } = useContext(QuoteContext);
  const text = `"${quote}" — ${author}`;

  const redditUrl = `https://www.reddit.com/submit?title=${encodeURIComponent(
    "Random Quote",
  )}&text=${encodeURIComponent(text)}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

  const threadsUrl = `https://www.threads.com/intent/post?text=${encodeURIComponent(text)}`;
  return (
    <div className="share-quote">
      <a id="tweet-quote" href={twitterUrl} target="_blank" rel="noreferrer">
        <FaTwitter />
      </a>
      <a className="thread" href={threadsUrl} target="_blank" rel="noreferrer">
        <FaThreads />
      </a>
      <a className="reddit" href={redditUrl} target="_blank" rel="noreferrer">
        <FaRedditAlien />
      </a>
    </div>
  );
}

function NewQuoteButton() {
  const { handleNewQuote } = useContext(QuoteContext);
  return (
    <button id="new-quote" className="btn" onClick={handleNewQuote}>
      New Quote
    </button>
  );
}

function Error() {
  const { errMsg, handleNewQuote } = useContext(QuoteContext);
  return (
    <div className="error-box">
      <p className="error">{errMsg || "something went wrong"}</p>
      <button className="btn retry" onClick={handleNewQuote}>
        Try Again
      </button>
    </div>
  );
}
