let url = "https://zqz96cc7lj.execute-api.ca-central-1.amazonaws.com/prod"

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(body => {
        // Your code to process the JSON data and append it to the leaderboard here

        // Access the total volume
        const totalVolume = body.body.totalVolume;

        // Sort the walletAddresses data
        const sortedData = body.body.walletAddresses.sort((a, b) => {
            const amountA = parseFloat(a.amount);
            const amountB = parseFloat(b.amount);
            // Compare amounts in descending order
            return amountB - amountA;
        });

        const leaderboardDiv = document.querySelector('.leaderboard');
        sortedData.forEach((user, index) => {
            const username = user.username;

            // Fixed accessing the amount for each user
            const amount = parseFloat(user.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });


            //Update div with total volume
            document.querySelector('.volume-value').innerText = parseFloat(totalVolume).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Create a new div element for each user
            const personDiv = document.createElement('div');
            personDiv.classList.add('person');
            personDiv.setAttribute('rank', index + 1);

            personDiv.addEventListener('mouseover', function(event) {
                const tooltip = document.getElementById('tooltip');
                tooltip.style.display = 'block';
            });

            personDiv.addEventListener('mousemove', function(event) {
                const tooltip = document.getElementById('tooltip');
                tooltip.style.top = event.clientY + 'px';
                tooltip.style.left = event.clientX + 'px';
            });

            personDiv.addEventListener('mouseout', function() {
                const tooltip = document.getElementById('tooltip');
                tooltip.style.display = 'none';
            });

            personDiv.addEventListener('click', function() {
                const addressToCopy = user.address;  // Assuming each user object has an address property
                navigator.clipboard.writeText(addressToCopy).then(function() {
                    const popup = document.getElementById('popup');
                    popup.style.display = 'block';
                    setTimeout(function() {
                        popup.style.display = 'none';
                    }, 2000); // Hide after 2 seconds
                }).catch(function(err) {
                    console.error('Could not copy to clipboard:', err);
                });
            });

            // Create the left div
            const leftDiv = document.createElement('div');
            leftDiv.classList.add('left');

            // Create the person name div
            const personNameDiv = document.createElement('div');
            personNameDiv.classList.add('person-name');
            personNameDiv.textContent = username;

            // Create the person balance div
            const personBalanceDiv = document.createElement('div');
            personBalanceDiv.classList.add('person-ballance');
            personBalanceDiv.textContent = amount;
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
                if (index == 0) {
                    const medalImg = document.createElement('img');
                    medalImg.setAttribute('src', `${index + 1}st-prize-2.png`);
                    medalImg.setAttribute('alt', `${index + 1}-place-medal`);
                    personRankDiv.appendChild(medalImg);
                } else if (index == 1) {
                    const medalImg = document.createElement('img');
                    medalImg.setAttribute('src', `${index + 1}nd-place-2.png`);
                    medalImg.setAttribute('alt', `${index + 1}-place-medal`);
                    personRankDiv.appendChild(medalImg);
                } else if (index == 2) {
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
    })

    .catch(error => {
        console.error("Fetch error:", error);
    });
