import React from "react";
import { formatArticleDate } from "./Utils";

const placeholderImage =
  "https://via.placeholder.com/1280x720.png?text=No+preview+is+available";

export function NewsCard({ article, isFirst }) {
  const imageClassName = isFirst
    ? "h-80 w-full object-cover rounded-t-lg"
    : "h-48 w-full object-cover rounded-t-lg";
  const cardClassName = isFirst
    ? "flex flex-col justify-between bg-white p-6 rounded-b-lg"
    : "flex flex-1 flex-col justify-between bg-white p-6 rounded-b-lg";

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
      <div className={`${isFirst ? "flex flex-col sm:flex-row" : ""}`}>
        <div className="flex-shrink-0">
          <img
            className={imageClassName}
            src={article.url_to_image ? article.url_to_image : placeholderImage}
            alt=""
          />
        </div>
        <div className={cardClassName}>
          <div>
            <p className="text-sm font-medium mb-2">
              <span className="text-gray-500">{article.apiSource} | </span>
              {article.source?.id && (
                <a
                  href={article.url}
                  className="text-primary hover:text-primary-dark hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.source.source}
                </a>
              )}
            </p>
            <a href={article.url} className="block group" target="_blank" rel="noopener noreferrer">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
                {article.title}
              </h2>
              <p className="mt-3 text-base text-gray-500 line-clamp-3">
                {article.description}
              </p>
            </a>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {article.raw_author}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={article.published_at}>
                {formatArticleDate(article.published_at)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
