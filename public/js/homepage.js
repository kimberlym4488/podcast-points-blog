
    function share() {
      if(navigator.share){
      navigator.share(
      {
        title: 'You need to see this!',
        text: 'Check out this awesome podcast and vote on it for podcast of the month',
        url: '',
      })
      .then(() => console.log('Successfully shared'))
      .catch(error => localStorage.setItem('toast', err),    
        toastIt(true));
    }
    return;
  }
  