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
          setUrl(result.Item.url)
          setFileName(result.Item.filename)
          window.open(
            result.Item.url,
            '_blank' 
          );
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}
    >
     <form onSubmit={handleSubmit(onSubmit)}>
       <label>Geef UUID In!</label>
          <input ref={register} value={uid} onChange={handleChangeInput} type="text" name="picture" style={{ width: 250 + 'px' }} />
      <button>Submit</button>
    </form>
    </div>
    
      <h4>File name: {fileName}</h4>
      <h4>Download link: {url}</h4>
      </div>
  );
};

export default Download;
