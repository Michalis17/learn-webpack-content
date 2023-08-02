export function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  if (formText) {
    sendDataToServer('/analysis', { input: formText });
  }
  // Client.checkForName(formText)

  console.log("::: Form Submitted :::")
  fetch('http://localhost:3000/test')
    .then(res => res.json())
    .then(function (res) {
      document.getElementById('results').innerHTML = res.message
    })



}

// Function to send a POST request to the server
export const sendDataToServer = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const responseData = await response.json();
    console.log('Response from server:', responseData);
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
};
