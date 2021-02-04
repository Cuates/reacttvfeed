import React from 'react';
import Loader from '../Components/Loader';
import useAxiosGet from '../Hooks/HttpRequests';
import TVFeedActionCard from '../Components/TVFeedActionCard';
import TVFeedCard from '../Components/TVFeedCard';

function ApiExtract(props) {
  const url = '<API_URL>';

  let content = null;

  let cardType = props.cardtype;

  let tvResponse = useAxiosGet(url, props.method, props.tvsearch);

  if (tvResponse.error) {
    content = <p>
      { tvResponse.data.Status }
      </p>
  }

  if (tvResponse.loading) {
    content = <Loader></Loader>
  }

  if (tvResponse.data) {
    console.log(tvResponse.data)
    if (tvResponse.data.Count > 0) {
      if (cardType === "TVFeedActionCard") {
        content = (
          <TVFeedActionCard
            tvsResponse = {tvResponse.data.Result}
          />
        );
      }
      else if (cardType === "TVFeedCard") {
        content = (
          <TVFeedCard
            tvsResponse = {tvResponse.data.Result}
          />
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

export default ApiExtract;