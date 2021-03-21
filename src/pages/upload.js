import React, {useState} from 'react';
import {useForm} from 'react-hook-form'

const Upload = () => {
  const { register, handleSubmit } = useForm()
  const [uid, setUid] = useState();


  let file = null;

  var fileName;
  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("picture", data.picture[0])

    
    fetch("https://ddaidvbveh.execute-api.us-east-1.amazonaws.com/default/getPresignedUrl?filename=" + fileName)
      .then(res => res.json())
      .then(
        (result) => {
          const requestOptions = {
            method: 'PUT',
            body: file
          };
          fetch(result.uploadURL, requestOptions)
            .then(response => { })
            .then(data => {
              setUid(result.uid);
            });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )


  }

  const handleChange = (fileEvent) => {
    fileName = getFileNameWithExt(fileEvent);
    file = fileEvent.target.files[0];
  }
  const getFileNameWithExt = (fileEvent) => {

    if (!fileEvent || !fileEvent.target || !fileEvent.target.files || fileEvent.target.files.length === 0) {
      return;
    }

    const name = fileEvent.target.files[0].name;
    const lastDot = name.lastIndexOf('.');

    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    return fileName + "." + ext;

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
          <input onChange={(e) => handleChange(e)} ref={register} type="file" name="picture" style={{ width: 250 + 'px' }}  />
        <button  >Submit</button>
        </form>
      </div>

      <h4>UUID: {uid}</h4>
    </div>
  );
};


export default Upload;
