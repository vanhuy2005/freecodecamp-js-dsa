function sumPrimes(num) {
  // Sieve of Eratosthenes to find all primes up to num
  let isPrime = Array(num + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.reduce((sum, prime, i) => (prime ? sum + i : sum), 0);
}

sumPrimes(10);