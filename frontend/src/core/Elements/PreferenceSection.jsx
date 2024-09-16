import React from "react";
import Skeleton from "react-loading-skeleton";

const PreferenceSection = ({
  title,
  description,
  options,
  loading,
  preference,
  register,
  preferenceKey,
  keyProp,
  labelProp,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div>
        <h3 className="text-lg font-medium leading-6 text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text">{description}</p>
      </div>
      <div className="mt-6">
        <fieldset>
          {!loading && (
            <div className="text-sm text-text font-bold" aria-hidden="true">
              {`${options.length} ${title.toLowerCase()}`}
            </div>
          )}
          <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
            {loading && <Skeleton count={10} />}

            {options.map((option) => {
              return (
                <div
                  key={option[keyProp]}
                  className="relative flex items-center justify-between"
                >
                  <label
                    htmlFor={`${preferenceKey}_check_${option.id}`}
                    className="text-sm text-text"
                  >
                    {option[labelProp]}
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      id={`${preferenceKey}_check_${option.id}`}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:!bg-primary checked:!border-primary hover:border-primary/50 focus:ring-0 focus:ring-offset-0"
                      value={option.id}
                      {...register(preferenceKey)}
                      defaultChecked={preference?.[preferenceKey]?.includes(
                        option.id
                      )}
                    />
                    <label
                      htmlFor={`${preferenceKey}_check_${option.id}`}
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default PreferenceSection;
