import React, { useState } from 'react';
import ApiAlteration from '../Components/ApiAlteration';

function TVFeedActionCard(props) {
  let urlPrefix = 'https://rarbg.to/torrents.php?categories=41;49&search=';

  // console.log("props: " + JSON.stringify(props));
  // console.log("props.tvsResponse: " + JSON.stringify(props.tvsResponse));

  // if (props.tvsResponse[0]['Status']) {
  //   console.log("props.tvsResponse[0]['Status']: " + props.tvsResponse[0]['Status']);
  //   if (props.tvsResponse[0]['Status'] && props.tvsResponse[0]['Message']) {
  //     alert (props.tvsResponse[0]['Status'] + ": " + props.tvsResponse[0]['Message']);
  //   }
  // }
  // else {
  //   console.log("props.tvsResponse[0]['Status']: Does not exist");
  // }

  // Hook for use reducer which utilizes use state
  const [callApiAlteration, setCallApiAlteration] = useState({contentResponse: '', newList: props.tvsResponse});

  function handleAlteration(titlelong, titleshort, publishdate, actionstatus, method, cardType) {
    // console.log("props.tvsResponse[0]['Status']: " + (props.tvsResponse[0]['Status'] ? 'Exists' : 'Does not exists'));
    // console.log("props.tvsResponse.indexOf('Status'): " + props.tvsResponse.indexOf('Status') > -1);

    // if (props.tvsResponse[0]['Status'] === "Success") {
    //   console.log("props.tvsResponse[0]['Status']: " + props.tvsResponse[0]['Status']);
    // }

    // if (props.tvsResponse[0].Status === "Success") {
    //   console.log('Status is success')
    // }

    // console.log("newListResponse: " + JSON.stringify(callApiAlteration.newList));

    const contentResponse = (<ApiAlteration
      method = {
        method
      }
      carType = {
        cardType
      }
      payload = {{
        titlelong: titlelong,
        titleshort: titleshort,
        publishdate: publishdate,
        actionstatus: actionstatus
      }} />);

    // Set new list without element
    const newList = callApiAlteration.newList.filter((item) => item.titlelong !== titlelong);

    // Set state with new list
    setCallApiAlteration({contentResponse: contentResponse, newList: newList});

    // console.log("props.tvsResponse[0]: " + JSON.stringify(props.tvsResponse[0]));

    // console.log("callApiAlteration: " + JSON.stringify(callApiAlteration));
  }

  // Set content variable
  let content = (
    <div>
      {callApiAlteration.newList.length > 0 &&
      callApiAlteration.newList.map((tvResponse, key) =>
        <div key = {key} id={key}>
          <div className = "border mb-4 rounded overflow-hidden bg-gray-700 text-yellow-100">
            <div className = "p-3">
              <h3 className = "font-bold text-xl mb-3 break-words">
                  { tvResponse.titlelong }
              </h3>
              <div className = "font-bold mb-3 break-words">
                { tvResponse.titleshort }
              </div>
              <div className = "font-bold mb-3">
                    { tvResponse.publishdate }
              </div>
              <div className = "font-bold mb-3">
                    { tvResponse.actionstatus }
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-auto">
                  <a href={`${urlPrefix} ${tvResponse.titlelong}`} target="_blank" rel="noopener noreferrer" className="bg-blue-500 mr-10 rounded text-white p-2 flex justify-center w-full">
                    View
                  </a>
                </div>
                {
                  (tvResponse.actionstatus === "1" || tvResponse.actionstatus === "0") &&
                  <div className="flex flex-auto">
                    <button type="button" id="retain" className="bg-yellow-500 mr-10 rounded text-white p-2 flex justify-center w-full"
                    onClick={() => handleAlteration(tvResponse.titlelong, tvResponse.titleshort, tvResponse.publishdate, "2", "put", 'TVFeedActionCard')}
                    >
                      Retain
                    </button>
                  </div>
                }
                {
                  (tvResponse.actionstatus === "2" || tvResponse.actionstatus === "0") &&
                  <div className="flex flex-auto">
                    <button type="button" id="ignore" className="bg-green-500 mr-10 rounded text-white p-2 flex justify-center w-full"
                    onClick={() => handleAlteration(tvResponse.titlelong, tvResponse.titleshort, tvResponse.publishdate, "1", "put", 'TVFeedActionCard')}
                    >
                      Ignore
                    </button>
                  </div>
                }
                <div className="flex flex-auto">
                  <button type="button" id="edit" className="bg-purple-500 mr-10 rounded text-white p-2 flex justify-center w-full">
                    Edit
                  </button>
                </div>
                <div className="flex flex-auto">
                  <button type="button" id="delete" className="bg-red-500 rounded text-white p-2 flex justify-center w-full"
                    onClick={() => handleAlteration(tvResponse.titlelong, "", "", "", "delete", 'TVFeedActionCard')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {callApiAlteration.contentResponse}
    </div>
  );

  return (
    <div>
      {content}
    </div>
  );
}

export default TVFeedActionCard;