export function getUserDetails() {
  const userDetails = JSON.parse(localStorage.getItem('Access-Token'));
  return {
    userId: userDetails[1],
    userType: userDetails[2],
    savedToken:userDetails[0]
  }
}