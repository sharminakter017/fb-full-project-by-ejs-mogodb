const basic_form = document.querySelector('#basic_form');
const msg = document.querySelector('.msg');

basic_form.onsubmit = (e) => {
e.preventDefault();

const from_data = new FormData(e.target);
const data = Object.fromEntries(from_data.entries());
console.log(data);
if (!data.auth_name || !data.auth_photo || !data.p_content || !data.p_photo) {
msg.innerHTML = "All fields are required!";
console.log("All fields are required ");
}else{
createLSData('fb_post', data);
}



}