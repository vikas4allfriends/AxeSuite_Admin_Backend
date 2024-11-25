import React, { useState } from 'react';

function App() {
  const [returnedData, setReturnedData] = useState({});
  const [person, setPerson] = useState({ ID: 0, NAME: '', CITY: '', STATE: '' });

  // Handle input changes
  const setInput = (e) => {
    const { name, value } = e.target;

    setPerson((prevState) => ({
      ...prevState,
      [name]: name === 'ID' ? parseInt(value) || 0 : value, // Convert 'ID' to an integer, others remain strings
    }));
  };
//get all data 
  const getPerson = async () => {
    try {
      console.log(':');
      const response = await fetch('http://localhost:8080/api/getPerson', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(person),
      });
      if (!response.ok) throw new Error('Failed to Get Data');
      const newData = await response.json();
      console.log('Created Data:', newData);
      setReturnedData(newData[0] || {});
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  // Create a person
  const createPerson = async () => {
    try {
      console.log('Creating Employee:', person);
      const response = await fetch('http://localhost:8080/api/createPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(person),
      });
      if (!response.ok) throw new Error('Failed to create person');
      const newData = await response.json();
      console.log('Created Data:', newData);
      setReturnedData(newData[0] || {});
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Delete a person
  const deletePerson = async () => {
    try {
      console.log('Deleting Employee with ID:', person.ID);
      const response = await fetch('http://localhost:8080/api/deletePerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ID: person.ID }),
      });
      if (!response.ok) throw new Error('Failed to delete person');
      const newData = await response.json();
      console.log('Deleted Data:', newData);
      setReturnedData(newData[0] || {});
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  //update a person by id 
  const updatePerson = async () => {
    const updatedData = await fetch('http://localhost:8080/api/updatePerson', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(person)
    })
      .then(res => res.json());
    console.log(updatedData);
    setReturnedData(updatedData[0] || {});
  }

  return (
    <div className="App">
      <div className="App2">
        <input
          type="number"
          name="ID"
          placeholder="ID"
          onChange={setInput}
        />
        <input
          type="text"
          name="NAME"
          placeholder="Name"
          onChange={setInput}
        />
        <input
          type="text"
          name="CITY"
          placeholder="CITY"
          onChange={setInput}
        />
        <input
          type="text"
          name="STATE"
          placeholder="State"
          onChange={setInput}
        />
        <br />

        <button onClick={createPerson}>Create Employee</button>

        <button onClick={deletePerson}>Delete Employee</button>

        <button onClick={updatePerson}>Update Employee</button>

    

        <div>
          <h3>Returned Data:</h3>
          <pre>{JSON.stringify(returnedData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
