import React from "react";

export default function Alert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    isVisible && (
      <div
        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        <span className="font-medium">Success alert!</span> Change a few things
        up and try submitting again.
      </div>
    )
  );
}
