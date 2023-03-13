import { useState } from "react";
import { CSVLink } from "react-csv";
type Artist = {
  name: string;
  mbid: string;
  listeners: string;
  url: string;
  image: {
    "#text": string;
    size: string;
  }[];
};
function App() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<Artist[]>([]);
  const [resultCheck, setResultCheck] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [csvData, setCsvData] = useState([
    ["name", "mbid", "url", "image_small", "image"],
  ]);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: query,
      }),
    });
    const results = await response.json();
    const artists: Artist[] = results.data.artistmatches.artist;
    setIsRandom(results.random);
    artists.map((artist) => {
      const artistInfo = [
        artist.name,
        artist.mbid,
        artist.url,
        artist.image[0]["#text"],
        artist.image[0]["size"],
      ];
      setCsvData((prevData) => [...prevData, artistInfo]);
      setQuery("");
    });

    setResult(artists);
    setResultCheck(true);
  };
  return (
    <div className="bg-first flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-red-800 text-5xl mb-4 font-extrabold">
        Artist Search
      </h1>
      <form
        onSubmit={(e) => handleSearch(e)}
        className="mb-4 flex flex-col gap-4 items-center"
        action=""
      >
        <input
          className="bg-second placeholder:text-first placeholder-blue py-2 shadow-lg border-third outline-none border-2 px-3 rounded-lg text-white"
          type="text"
          value={query}
          placeholder="search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="w-min py-2 px-4 rounded-md border-third  border-2 bg-second">
          Search
        </button>
      </form>
      {resultCheck ? (
        <>
          {isRandom ? (
            <p className="text-red-800 font-extrabold mb-3">
              Artist not found.{" "}
            </p>
          ) : (
            ""
          )}
          <div className="results max-w-full w-[700px] max-h-full overflow-x-scroll h-[350px] overflow-y-scroll p-5 flex flex-col gap-5">
            {result.map((artist, index) => (
              <div
                className="result border-2 bg-fourth border-second rounded-md py-4 px-5 md:gap-20 gap-5 w-full flex justify-center items-center"
                key={index}
              >
                <h3 className="font-bold w-1/4 text-center">{artist.name}</h3>
                <div className="img-div w-1/4 text-center">
                  <img
                    className="rounded-full"
                    src={artist.image[1]["#text"]}
                    alt={`${artist.name} no image`}
                  />
                </div>
                <p className="font-bold w-1/4 text-center">
                  {artist.listeners} listeners
                </p>
                <a
                  className="w-1/4 text-center text-blue-400 hover:underline"
                  href={artist.url}
                  target="_blank"
                >
                  More info
                </a>
              </div>
            ))}
          </div>
          <CSVLink
            className="mt-4 py-2 px-4 rounded-md border-third  border-2 bg-second"
            data={csvData}
            filename="artists.csv"
          >
            Download CSV
          </CSVLink>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
