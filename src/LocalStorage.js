
 const readLSData = (key) => {
    if( localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));

    }else{
        return false;
    }
}



 const createLSData = (key,value) => {

 //init val
 let data = [];

 //check key exists or not
 if(localStorage.getItem(key)){
    data = JSON.parse(localStorage.getItem(key));
 };

 //nou push data to ls
 data.push(value);
 //set data
 localStorage.setItem(key,JSON.stringify(data));
}



