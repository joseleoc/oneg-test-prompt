import { Grid } from "react-loader-spinner";
import "./spinnerLoader.css";

export default function SpinnerLoader() {
  return (
    <div className="spinner-container">
      <div className="spinner-content">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    </div>
  );
}
