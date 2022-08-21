export const formatDate = (date) =>{

   const dateObj = new Date(date);
   console.log(dateObj);

   const hour = dateObj.getHours();
   const min = dateObj.getMinutes();

   return `${formatNumber(hour)}:${formatNumber(min)}`

};

export const formatNumber = (num) =>{
    if(num < 10) return `0${num}`;
    return num;
}