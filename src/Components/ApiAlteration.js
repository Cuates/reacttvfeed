import React from 'react';
import Loader from './Loader';
import useAxiosAlteration from '../Hooks/HttpAlteration';
import TVFeedActionCard from './TVFeedActionCard';
import TVFeedAdd from './TVFeedAdd';

function ApiAlteration(props) {
  const url = '<API_URL>';

  let content = null;

  let cardType = props.cardtype;

  // console.log(JSON.stringify(props));

  let tvResponse = useAxiosAlteration(url, props.method, props.payload);

  if (tvResponse.error) {
    content = <p>
      { tvResponse.data.Status }
      </p>
  }

  if (tvResponse.loading) {
    content = <Loader></Loader>
  }

  if (tvResponse.data) {
    if (tvResponse.data.Count > 0) {
      // console.log(JSON.stringify(tvResponse.data.Result));
      if (cardType === "TVFeedAdd") {
        content = (
          <TVFeedAdd
            tvsResponse = {tvResponse.data.Result}
          />
        );
      }
      else if (cardType === "TVFeedActionCard") {
        content = (
          tvResponse.data.Result.map((tvResponse, key) =>
            <div key = {key}>
              <TVFeedActionCard
                tvsResponse = {tvResponse}
              />
            </div>
          )
        );
      }
      // else {
      //   content = (
      //     <div className = "border mb-4 rounded overflow-hidden">
      //       <div className = "p-3">
      //         <h3 className = "font-bold text-xl mb-3">
      //           Display Card Not Implemented
      //         </h3>
      //       </div>
      //     </div>
      //   );
      // }
    }
    else {
      content = (
        <div className = "border mb-4 rounded overflow-hidden">
          <div className = "p-3">
            <h3 className = "font-bold text-xl mb-3">
              No data found
            </h3>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default ApiAlteration;