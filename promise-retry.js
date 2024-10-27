Implement a function in JavaScript that retries promises N number of times with a delay between each call. 
Example 
Input: retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed'); 
Output: 
... attempt 1 -> failed 
... attempt 2 -> retry after 50ms -> failed 
... attempt 3 -> retry after 50ms -> failed 
... Failed. 
In short, we have to create a retry function that Keeps on retrying until the promise resolves with delay and max retries.

  function retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed') {
    return new Promise((resolve, reject) => {
        const attempt = (n) => {
            asyncFn()
                .then(resolve)
                .catch((error) => {
                    if (n === 0) {
                        console.log(finalError);
                        reject(finalError);  // Reject with final error message after all retries fail
                    } else {
                        console.log(`... attempt ${retries - n + 1} -> failed`);
                        setTimeout(() => {
                            console.log(`... retry after ${delay}ms`);
                            attempt(n - 1);  // Retry after the delay
                        }, delay);
                    }
                });
        };

        attempt(retries);  // Start the first attempt
    });
}
