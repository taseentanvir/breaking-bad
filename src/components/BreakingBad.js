import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "react-loader-spinner";
import Footer from "./Footer";
// import lodash from "lodash";

toast.error();

const BreakingBad = () => {
  /* States */
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const apiURL = `https://www.breakingbadapi.com/api/characters?name=${query}`;

    axios
      .get(apiURL)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        toast.error("Error while fetching the data");
      });

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3500);

    setIsLoading(false)
  }, [query]);

  const character = () => {
    return (
      <div className="cards">
        {items.map((item) => {
          return (
            <section>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="card-back">
                    <h1>{item.name}</h1>
                    <ul>
                      <li>
                        <strong>Actor Name:</strong> {item.portrayed}
                      </li>
                      <li>
                        <strong>Nickname:</strong> {item.nickname}
                      </li>
                      <li>
                        <strong>Birthday:</strong> {item.birthday}
                      </li>
                      <li>
                        <strong>Occupation: </strong>
                        {item.occupation.map((job, index) => {
                          return <span>{(index ? " | " : "") + job}</span>;
                        })}
                      </li>
                      <li>
                        <strong>Status:</strong> {item.status}
                      </li>
                      <li>
                        <strong>Appearance:</strong> {item.appearance}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const empty = query === "";

    if (empty) {
      toast.error("Invalid character name");
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <Loader
          type="ThreeDots"
          color="white"
          height={100}
          width={100}
          style={{}}
        />
      </div>
    );
  }

  if (items) {
    return (
      <React.Fragment>
        <div className="container">
          <img
            className="header-img"
            src="./header.png"
            alt="Breaking Bad Logo"
          />
          <form onSubmit={handleSubmit}>
            <input
              id="search"
              name="search"
              type="text"
              value={query}
              placeholder="Search Characters"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </form>
          {character()}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
};

export default BreakingBad;
