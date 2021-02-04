import React, { useReducer, useState } from 'react';
import ApiAlteration from '../Components/ApiAlteration';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TVAdd() {
  // Set initial state
  const initialState = {
    titlelong: '',
    titleshort: '',
    publishdate: '',
    actionstatus: '0',
    contentResponse: []
  }

  const [startDate, setStartDate] = useState(new Date());

  // Hook for use reducer which utilizes use state
  const [callApiAlteration, setCallApiAlteration] = useReducer(
    // New state depends on previous state
    (prevState, newState) => ({...prevState, ...newState}),
    initialState);

  function handleAlteration(titlelong, titleshort, publishdate, actionstatus, method) {
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
      cardtype = {
        "TVFeedAdd"
      }
      method={
        method
      }
      payload={{
        titlelong: titlelong,
        titleshort: titleshort,
        publishdate: startDate,
        actionstatus: actionstatus
      }} />);

    // Set state with new list
    // setCallApiAlteration({contentResponse: ['HI']});
    // setCallApiAlteration({contentResponse: [JSON.parse({"Name": 'HI'})]});
    // setCallApiAlteration({contentResponse: [JSON.stringify(contentResponse)]});
    setCallApiAlteration({contentResponse: contentResponse});

    console.log("content: " + JSON.stringify(callApiAlteration.contentResponse));

    // console.log("props.tvsResponse[0]: " + JSON.stringify(props.tvsResponse[0]));
  }

  // Set constant variable with on change event
  const handleChange = evt => {
    // Set name an value from event target
    const {name, value} = evt.target;

    // Set name and value from on change event
    setCallApiAlteration({[name]: value});
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
          <label className="rounded text-black p-2 flex justify-center w-full">Publish Date</label>
          {/* <input type="text" className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-full" name="publishdate" id="publishdate" defaultValue={initialState.publishdate} placeholder="Publish Date" onChange={handleChange} /> */}
          <DatePicker
            name="publishdate"
            id="publishdate"
            className="mr-10 bg-yellow-100 rounded text-black p-2 flex justify-center w-max"
            selected={startDate}
            onChange={date => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="yyyy-MM-dd HH:mm:ss"
            showTimeInput
          />
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
          <button type="button" className="mr-10 bg-gray-500 rounded text-black p-2 flex justify-center w-full" value="Search" onClick={() => handleAlteration(callApiAlteration.titlelong, callApiAlteration.titleshort, callApiAlteration.publishdate, callApiAlteration.actionstatus, "post")}>Add</button>
        </div>
      </div>

      {callApiAlteration.contentResponse}
    </div>
  );
}

export default TVAdd;