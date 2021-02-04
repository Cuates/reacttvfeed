import React from 'react';
import ApiExtract from '../Components/ApiExtract';

function Home() {
  // Set initial state
  const params = {
    titlelong: '',
    titleshort: '',
    actionstatus: '',
    limit: '25',
    sort: 'desc'
  }

  return (
    <div className="bg-green-800 pb-2 pt-2 text-yellow-100">
      <h1
        className="font-bold text-2xl mb-3"
      >
        TV Latest 25 Entries
      </h1>
      <div className="p-3">
        {
          <ApiExtract
            cardtype = {
              "TVFeedCard"
            }
            method={
              "get"
            }
            tvsearch={ params }
          />
        }
      </div>
    </div>
  );
}

export default Home;