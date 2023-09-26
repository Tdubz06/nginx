const request = require('request');

let url = "https://zqz96cc7lj.execute-api.ca-central-1.amazonaws.com/prod"

let options = {json: true};

request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // console.log(body)

    //     const sortedData = body.body.sort((a, b) => {
    //         const amountA = parseFloat(a.amount);
    //         const amountB = parseFloat(b.amount);
        
    //         // Compare amounts in descending order
    //         return amountB - amountA;
    //     });
    
    //     sortedData.forEach(user => {
    //       const username = user.username;
    //       const amount = parseFloat(user.amount); // Convert the amount to a numeric value if needed
    
    //       // You can do whatever you want with the username and amount here, such as printing them to the console
    //       // console.log(`Username: ${username}, Amount: ${amount}`);
    //       //reference the data using sortedData[0].username and sortedData[0].amount
    //   });



    const sortedData = body.body.sort((a, b) => {
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);
        // Compare amounts in descending order
        return amountB - amountA;
      });
      
      const leaderboardDiv = document.querySelector('.leaderboard');
      
      sortedData.forEach((user, index) => {
        const username = user.username;
        const amount = parseFloat(user.amount);
      
        // Create a new div element for each user
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');
        personDiv.setAttribute('rank', index + 1);
      
        // Create the left div
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left');
      
        // Create the person name div
        const personNameDiv = document.createElement('div');
        personNameDiv.classList.add('person-name');
        personNameDiv.textContent = username;
      
        // Create the person balance div
        const personBalanceDiv = document.createElement('div');
        personBalanceDiv.classList.add('person-balance');
        personBalanceDiv.textContent = amount.toFixed(2); // Assuming you want to display the balance with 2 decimal places
        const tokenShortSpan = document.createElement('span');
        tokenShortSpan.classList.add('token-short');
        tokenShortSpan.textContent = '\u00A0TDGC'; // Using '\u00A0' for non-breaking space
      
        personBalanceDiv.appendChild(tokenShortSpan);
      
        // Append name and balance to left div
        leftDiv.appendChild(personNameDiv);
        leftDiv.appendChild(personBalanceDiv);
      
        // Create the right div for rank
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right');
      
        // Create the person rank div
        const personRankDiv = document.createElement('div');
        personRankDiv.classList.add('person-rank');
      
        // Check if it's one of the top three ranks
        if (index < 3) {
          // Create an img element for the medal
          if(index == 0){
          const medalImg = document.createElement('img');
          medalImg.setAttribute('src', `${index + 1}st-prize-2.png`);
          medalImg.setAttribute('alt', `${index + 1}-place-medal`);
          personRankDiv.appendChild(medalImg);
          }
          else if(index == 1){
            const medalImg = document.createElement('img');
            medalImg.setAttribute('src', `${index + 1}nd-place-2.png`);
            medalImg.setAttribute('alt', `${index + 1}-place-medal`);
            personRankDiv.appendChild(medalImg);
            }
            else if(index == 2){
              const medalImg = document.createElement('img');
              medalImg.setAttribute('src', `${index + 1}rd-place-2.png`);
              medalImg.setAttribute('alt', `${index + 1}-place-medal`);
              personRankDiv.appendChild(medalImg);
              }
        } else {
          // Otherwise, use the regular rank number
          personRankDiv.textContent = index + 1;
        }
      
        // Append rank to right div
        rightDiv.appendChild(personRankDiv);
      
        // Append left and right divs to person div
        personDiv.appendChild(leftDiv);
        personDiv.appendChild(rightDiv);
      
        // Append the person div to the leaderboard div
        leaderboardDiv.appendChild(personDiv);
      });
      

    };
});