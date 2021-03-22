import React, { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import Auth from '@aws-amplify/auth';

const Download = () => {
  const { register, handleSubmit } = useForm()
  const [uid, setUid] = useState();
  const [url, setUrl] = useState();
  const [username, setUsername] = useState();
  const [fileName, setFileName] = useState();

  useEffect(() => {
    async function fetchData() {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    }
    fetchData();
  }, []);
  const onSubmit = async (data) => {

    fetch("https://y62p6y7bx2.execute-api.us-east-1.amazonaws.com/default/GetFileById?id=" + uid + "&username=" + username)
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
            alert("Invoerveld is leeg of gevraagd bestand is ouder dan 1 dag!")
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
            <h2>Bestand downloaden</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label htmlFor="user-email" style={{ paddingTop: "13px" }}>
              &nbsp;Geef de unieke code (UUID) in:
          </label>
          <br></br>
          <input
           ref={register} value={uid} onChange={handleChangeInput}/>
            <div className="form-border"></div>
            <input id="submit-btn" type="submit" name="submit" value="Downloaden" />
          </form>
        </div>
        <h4>Bestand naam: {fileName}</h4>
        <h4>Download link: {url}</h4>
      </div>
      </div>
  );
};

export default Download;
