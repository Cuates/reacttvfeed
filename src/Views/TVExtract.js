import React, { useReducer } from 'react';
import ApiExtract from '../Components/ApiExtract';

function TVExtract() {
  // Set initial state
  const initialState = {
    titlelong: '',
    titleshort: '',
    actionstatus: '2',
    limit: '25',
    sort: 'desc',
    content: []
  }

  // Hook for use reducer which utilizes use state
  const [callApiExtract, setCallApiExtract] = useReducer(
    // New state depends on previous state
    (prevState, newState) => ({...prevState, ...newState}),
    initialState
  );

  // Set constant variable with on change event
  const handleChange = evt => {
    // Set name an value from event target
    const {name, value} = evt.target;

    // Set name and value from on change event
    setCallApiExtract({[name]: value});
  }

  return (
    <div className="bg-purple-300">
      <div className="bg-green-800 pb-2 pt-2 text-yellow-100 flex flex-wrap">
        <div className="flex flex-auto">
          <label className="rounded text-black p-2 flex justify-center w-full">Title Long</label>
          <input type="text" className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" name="titlelong" id="titlelong" defaultValue={initialState.titlelong} placeholder="Title Long" onChange={handleChange} />
        </div>
        <div className="flex flex-auto">
          <label className="rounded text-black p-2 flex justify-center w-full">Title Short</label>
          <input type="text" className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" name="titleshort" id="titleshort" defaultValue={initialState.titleshort} placeholder="Title Short" onChange={handleChange} />
        </div>
        <div className="flex flex-auto">
          <label className="rounded text-black p-2 flex justify-center w-full">
            Action
          </label>
          <select name='actionstatus' className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" id='actionstatus' defaultValue={initialState.actionstatus} onChange={handleChange}>
            <option value='' disabled>Action</option>
            <option value="0">Registered</option>
            <option value="1">Ignore</option>
            <option value="2" >Retain</option>
          </select>
        </div>
        <div className="flex flex-auto">
          <label className="rounded text-black p-2 flex justify-center w-full">
            Limit
          </label>
          <select name='limit' className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" id='limit' defaultValue={initialState.limit} onChange={handleChange}>
            <option value='' disabled>Limit</option>
            <option value="25" >25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex flex-auto">
          <label className="rounded text-black p-2 flex justify-center w-full">
            Sort
          </label>
          <select name='sort' className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" id='sort' defaultValue={initialState.sort} onChange={handleChange}>
            <option value='' disabled>Sort</option>
            <option value="asc">asc</option>
            <option value="desc" >desc</option>
          </select>
        </div>
        <div className="flex flex-auto">
          <button type="button" className="mr-10 bg-gray-500 rounded text-black p-2 flex justify-center w-full" value="Search" onClick={() => setCallApiExtract({content: <ApiExtract
            cardtype = {
              "TVFeedActionCard"
            }
            method={
              "get"
            }
            tvsearch={callApiExtract} />})}>Search</button>
        </div>
      </div>

      <div id="messageResponse" className="p-3">
        {callApiExtract.content}
      </div>
    </div>
  );
}

export default TVExtract;