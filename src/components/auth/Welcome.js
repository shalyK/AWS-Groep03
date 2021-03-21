import React from 'react';

export default function Welcome() {
  return (
    <section className="section auth" 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh'}}>
      <div className="container">
        <h1>Welkom!</h1>
        <p>U heeft met succes een nieuw account geregistreerd.</p>
        <p>We hebben je een e-mail gestuurd. Bevestig uw registratie!</p>
      </div>
    </section>
  )
}
