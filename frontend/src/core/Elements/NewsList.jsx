import React from "react";
import { Link } from "react-router-dom";
import LoadingItem from "./LoadingItem";
import { NewsCard } from "./NewsCard";
import NoNewsAvailable from "./NoNewsAvailable";

const NewsList = ({ articles, loading, loggedUser, totalNews }) => (
  <>
    {articles.length ? (
      <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {articles.slice(1).map((article) => (
            <NewsCard article={article} key={article.id} isFirst={false} />
          ))}
        </div>

        {loading && <LoadingItem />}
      </div>
    ) : (
      <>
        {loading ? (
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            <LoadingItem />
          </div>
        ) : (
          <NoNewsAvailable />
        )}
      </>
    )}
  </>
);

export default NewsList;
