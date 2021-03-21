import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
const Download = () => {
  const { register, handleSubmit } = useForm()
  const [uid, setUid] = useState();
  const [url, setUrl] = useState();
  const [fileName, setFileName] = useState();

  const onSubmit = async (data) => {

    fetch("https://y62p6y7bx2.execute-api.us-east-1.amazonaws.com/default/GetFileById?id="+ uid)
      .then(res => res.json())
      .then(
        (result) => {
          if (result?.Item){
            setUrl(result.Item.url)
            setFileName(result.Item.filename)
            window.open(
              result.Item.url,
              '_blank'
            );
          }else{
            setUrl("")
            setFileName("")
            alert("file removed!")
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }
  const handleChangeInput = (event) => {
    setUid(event.target.value);
  }
  return (
    <div>
      <div id="card" style={{ width: "70%" }}>
        <div id="card-content">
          <div id="card-title">
            <h2>Download File!</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} class="form">
            <label for="user-email" style={{ paddingTop: "13px" }}>
              &nbsp;Geef de unieke code (UUID) in:
          </label>
          <input
           ref={register} value={uid} onChange={handleChangeInput}/>
            <div class="form-border"></div>
            <input id="submit-btn" type="submit" name="submit" value="Download" />
          </form>
        </div>

        <h4>Bestand naam: {fileName}</h4>
        <h4>Download link: {url}</h4>
      </div>
      </div>
  );
};

export default Download;
