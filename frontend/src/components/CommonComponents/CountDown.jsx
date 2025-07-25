import React from "react";
import Countdown from "react-countdown";

const CountDown = ({
  targetDate,
  size = "medium",
  theme = "minimal",
  onComplete,
  className = "",
}) => {
  const sizeClasses = {
    small: {
      timeBox: " h-[50px] w-[50px] bg-white",
      timeValue: "text-lg font-bold",
      timeLabel: "text-xs",
    },
  };
  const themeClasses = {
    minimal: {
      container: "bg-transparent border-none shadow-none",
      timeBox:
        "bg-transparent border-b-2 border-indigo-500 text-gray-800 rounded-full",
      timeValue: "text-gray-900",
      timeLabel: "text-gray-500",
    },
  };

  const currentSize = sizeClasses[size];
  const currentTheme = themeClasses[theme];

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      onComplete?.();
      return (
        <div
          className={`rounded-xl ${currentSize.container} ${currentTheme.container} ${className}`}
        ></div>
      );
    }

    const timeUnits = [
      { value: days, label: "Days", shortLabel: "D" },
      { value: hours, label: "Hours", shortLabel: "H" },
      { value: minutes, label: "Minutes", shortLabel: "M" },
      { value: seconds, label: "Seconds", shortLabel: "S" },
    ];

    return (
      <div
        className={`rounded-xl ${currentSize.container} ${currentTheme.container} ${className}`}
      >
        <div className="text-center">
          <div className={`flex  items-center ${currentSize.timeContainer}`}>
            {timeUnits.map((unit, index) => (
              <div key={unit.label} className="flex items-center">
                <div
                  className={`text-center rounded-full flex flex-col items-center justify-center ${currentSize.timeBox} ${currentTheme.timeBox} transition-all duration-300 hover:scale-105`}
                >
                  <div
                    className={`${currentSize.timeValue} ${currentTheme.timeValue} leading-none`}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div
                    className={`${currentSize.timeLabel} ${currentTheme.timeLabel} mt-1 font-medium`}
                  >
                    {size === "small" ? unit.shortLabel : unit.label}
                  </div>
                </div>
                {index < timeUnits.length - 1 && (
                  <div
                    className={`mx-2 ${currentTheme.timeValue} ${currentSize.timeValue} opacity-50`}
                  >
                    :
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Countdown date={targetDate} renderer={renderer} />
    </div>
  );
};

export default CountDown;
