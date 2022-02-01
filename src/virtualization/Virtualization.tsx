import { useState, ReactNode } from "react";
import "./Virtualization.css";

interface VirtualizationTypes<T> {
  rowHeight: number;
  parentContainerHeight: number;
  data: T[];

  // Use extends when creating new types, with existing types use intersection types i.e &
  renderItem: (arg0: T & { isOdd: boolean }) => ReactNode;
}
const Virtualization = <T,>({
  rowHeight,
  data,
  parentContainerHeight,
  renderItem,
}: VirtualizationTypes<T>) => {
  const numberOfItemsAtATime = Math.floor(600 / rowHeight) + 2;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(numberOfItemsAtATime);

  const generateStartEndIndices = (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    // @ts-ignore
    const currentScrolledHeight = e.target.scrollTop;
    let start = Math.floor(currentScrolledHeight / rowHeight) - 2;
    let end = start + numberOfItemsAtATime;

    if (start < 0) start = 0;

    setStart(start);
    setEnd(end);
  };

  return (
    <div
      className="virtualization-viewport"
      style={{ height: parentContainerHeight }}
      onScroll={generateStartEndIndices}
    >
      <div
        className="virtualization-wrapper"
        style={{ height: data.length * rowHeight }}
      >
        {data.map(
          (item, index) =>
            index >= start &&
            index <= end && (
              <div
                key={index}
                style={{ height: rowHeight, top: index * rowHeight }}
                className={`virtualized-div`}
              >
                {renderItem({ ...item, isOdd: Boolean(index % 2) })}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Virtualization;
