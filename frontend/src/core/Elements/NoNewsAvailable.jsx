import React from 'react';

const NoNewsAvailable = () => {
  return (
    <div className="text-center py-16 px-6 sm:py-24 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <svg className="mx-auto h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-text sm:text-4xl">
          No articles available
        </h2>
        <p className="mt-4 text-lg text-text">
          It looks like there aren't any articles to display at the moment. You can scrape more news to display here.
        </p>
      </div>
    </div>
  );
};

export default NoNewsAvailable;
