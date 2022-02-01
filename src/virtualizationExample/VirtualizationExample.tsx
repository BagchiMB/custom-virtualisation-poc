import Virtualization from "../virtualization/Virtualization";
import "./VirtualizationExample.css";

const amountRows = 5000;
const rowHeight = 40; // px

type DataItem = {
  index: number;
  text: string;
  top: number;
};

const data: DataItem[] = [];
for (let index = 0; index < amountRows; index++) {
  data.push({ index, text: `Index ${index}`, top: index * rowHeight });
}

const VirtualizationExample = () => {
  return (
    <div className="virtualization-div">
      <h2>Virtualization Example</h2>

      <div className="componentVirtualizationWrapper">
        <Virtualization
          data={data}
          rowHeight={40}
          parentContainerHeight={600}
          renderItem={({ index, isOdd }) => (
            <div className={`random-div ${!isOdd ? "even-random-div" : ""}`}>
              Index:{index}, Item:{index + 1}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default VirtualizationExample;
