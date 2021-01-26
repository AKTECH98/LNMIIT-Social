export default (dateFuture)=>{
    let dateNow = Date.parse(new Date())
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      return (days === 1) ? `Yesterday` : `${days} days ago`;
    }

    if (hours > 0){
      return (hours === 1) ? `An hour ago` : `${hours} hours ago`;
    }

    if (minutes > 0){
      return (minutes === 1) ? `One minute ago` : `${minutes} minutes ago`;
    }
    
    return "Less than a minute ago"
  }