// Return a random alphanumeric string 5 chars long
// https://stackoverflow.com/a/33146982/2696867
export default () => btoa(+new Date + '').slice(-7, -2)
