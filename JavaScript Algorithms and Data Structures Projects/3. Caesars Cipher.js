/*
Caesars Cipher
One of the simplest and most widely known encryption techniques is a Caesar cipher, also known as a shift cipher. In a Caesar cipher, each letter in the plaintext is shifted a certain number of places down or up the alphabet.
For this challenge, we're going to implement a Caesar cipher that shifts letters by 13 places.
So, A becomes N, B becomes O, and so on.
*/

function rot13(str) {
  return str
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
      }
      else if (charCode >= 97 && charCode <= 122) {
        
        return String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
      }
      
      else {
        return char;
      }
    })
    .join("");
}

rot13("SERR PBQR PNZC");