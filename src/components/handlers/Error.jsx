import "./error.css";
import { TypeAnimation } from "react-type-animation";

const Error = () => (
  <div className="error-container">
    <div className="load_error">
      &#123;&nbsp;
      <TypeAnimation
        sequence={[
          "Something went wrong",
          2000,
          "",
          1000,
          "Server will be ready soon. :)",
          2000,
          "",
          1000,
          "Please try again later",
          2000,
          "",
          1000,
        ]}
        speed={{ type: "keyStrokeDelayInMs", value: 100 }}
        deletionSpeed={{ type: "keyStrokeDelayInMs", value: 40 }}
        cursor={true}
        repeat={Infinity}
      />
      &nbsp;&#125;
    </div>
  </div>
);

export default Error;
