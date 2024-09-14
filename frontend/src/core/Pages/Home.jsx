import React, { useState, useEffect } from "react";
import { sendGetRequest } from "../ApiService";
import { currentUser } from "../Elements/Utils";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  authorLoadOptions,
  sourceLoadOptions,
  loadSelectedOptions,
} from "../Elements/Utils";
import NewsList from "../Elements/NewsList";
import { Link } from "react-router-dom";
import customStyles from "../../styles/customStyles";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loggedUser = currentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [preferredAuthors, setPreferredAuthors] = useState([]);
  const [preferredSources, setPreferredSources] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const maxDisplayedSources = 5;
  const maxDisplayedAuthors = 5;

  useEffect(() => {
    setLoading(true);

    const authorIds = authors.map((item) => item.value);
    const sourceIds = sources.map((item) => item.value);

    sendGetRequest(
      `articles?page=${page}&search=${searchTerm}&authors=${authorIds}&sources=${sourceIds}`,
      { Authorization: `Bearer ${loggedUser?.token}` }
    ).then(function (response) {
      if (response.status) {
        setTotalNews(response.results?.total);
        if (response.results.data?.length) {
          setArticles(articles.concat(response.results.data));
        } else {
          setHasMore(false);
        }
      }

      setLoading(false);
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, searchTerm, authors, sources]);

  useEffect(() => {
    loadSelectedOptions(
      "authors",
      "author_name",
      setPreferredAuthors,
      loggedUser
    );
    loadSelectedOptions("sources", "source", setPreferredSources, loggedUser);
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#456c97' : '#d1d5db', // primary color when focused, gray-300 otherwise
      '&:hover': {
        borderColor: '#456c97', // primary color on hover
      },
      boxShadow: state.isFocused ? '0 0 0 1px #456c97' : 'none', // primary color shadow when focused
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#456c97' : state.isFocused ? '#e5e7eb' : null,
      color: state.isSelected ? 'white' : '#2F2F2F',
    }),
  };

  function handleScroll() {
    if (!hasMore) return;

    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      console.log("scrolling");
      setPage((prevPage) => prevPage + 1);
    }
  }

  const onChangeFilter = (value, type) => {
    setHasMore(true);
    setPage(1);
    setArticles([]);

    switch (type) {
      case "search":
        setSearchTerm(value);
        break;
      case "authors":
        setAuthors(value);
        break;
      case "sources":
        setSources(value);
        break;
    }
  };

  let searchDelay = null;
  const searchNewsHandler = (e) => {
    if (searchDelay) {
      clearTimeout(searchDelay);
    }

    searchDelay = setTimeout(() => {
      onChangeFilter(e.target.value, "search");
    }, 1000);
  };

  const handleButtonClick = async () => {
    setIsDataLoading(true); // Set loading state to true

    sendGetRequest(`news`).then(function (response) {
      setIsDataLoading(false);
      window.location.reload();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100"> {/* Changed background color */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8"> {/* Added white background and subtle shadow */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Daily News</h1>
            <p className="text-text">Stay informed with the latest updates</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="col-span-1">
              <input
                type="text"
                className="w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                placeholder="Search news..."
                onChange={searchNewsHandler}
              />
            </div>

            <div className="col-span-1">
              <AsyncPaginate
                value={authors}
                loadOptions={(search, loadedOptions, { page }) =>
                  authorLoadOptions(search, loadedOptions, { page, loggedUser })
                }
                onChange={(selectedValue) => {
                  onChangeFilter(selectedValue, "authors");
                }}
                additional={{
                  page: 1,
                }}
                isMulti={true}
                styles={customStyles}
                placeholder="Select author"
              />
            </div>

            <div className="col-span-1">
              <AsyncPaginate
                value={sources}
                loadOptions={(search, loadedOptions, { page }) =>
                  sourceLoadOptions(search, loadedOptions, { page, loggedUser })
                }
                onChange={(selectedValue) => {
                  onChangeFilter(selectedValue, "sources");
                }}
                additional={{
                  page: 1,
                }}
                isMulti={true}
                styles={customStyles}
                placeholder="Select source"
              />
            </div>

            <div className="col-span-1">
              <button
                onClick={handleButtonClick}
                disabled={isDataLoading}
                className="w-full bg-primary text-white rounded-md py-2 px-4 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isDataLoading ? "Loading..." : "Scrape News"}
              </button>
            </div>
          </div>

          <NewsList
            articles={articles}
            loading={loading}
            loggedUser={loggedUser}
            totalNews={totalNews}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
